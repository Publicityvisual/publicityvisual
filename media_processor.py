import os
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageEnhance
from moviepy.editor import VideoFileClip, TextClip, CompositeVideoClip
import tempfile
from urllib.parse import urlparse
import requests
from io import BytesIO

class MediaProcessor:
    def __init__(self, logo_path=None, opacity=0.7):
        """
        Inicializa el procesador de medios con configuración de marca de agua
        
        Args:
            logo_path (str): Ruta al logo para la marca de agua
            opacity (float): Opacidad de la marca de agua (0-1)
        """
        self.opacity = opacity
        self.logo = None
        self.watermark_text = "© Publicity Visual - Noticias Reales"
        
        if logo_path and os.path.exists(logo_path):
            self.logo = Image.open(logo_path).convert("RGBA")
            # Redimensionar logo si es muy grande
            max_size = (300, 100)
            self.logo.thumbnail(max_size, Image.Resampling.LANCZOS)
    
    def add_watermark_to_image(self, image_path, output_path=None):
        """
        Añade marca de agua a una imagen
        
        Args:
            image_path (str): Ruta a la imagen original
            output_path (str, optional): Ruta para guardar la imagen con marca de agua
            
        Returns:
            str: Ruta de la imagen procesada
        """
        try:
            # Cargar la imagen original
            if image_path.startswith(('http://', 'https://')):
                response = requests.get(image_path, stream=True)
                img = Image.open(BytesIO(response.content)).convert("RGBA")
            else:
                img = Image.open(image_path).convert("RGBA")
            
            # Crear una capa para la marca de agua
            watermark = Image.new('RGBA', img.size, (0, 0, 0, 0))
            draw = ImageDraw.Draw(watermark)
            
            # Añadir logo si existe
            if self.logo:
                # Posición del logo (esquina inferior derecha con margen)
                position = (
                    img.width - self.logo.width - 20,
                    img.height - self.logo.height - 20
                )
                # Aplicar opacidad al logo
                logo_with_opacity = self.logo.copy()
                alpha = logo_with_opacity.split()[3]
                alpha = ImageEnhance.Brightness(alpha).enhance(self.opacity)
                logo_with_opacity.putalpha(alpha)
                watermark.paste(logo_with_opacity, position, logo_with_opacity)
            
            # Añadir texto de copyright
            try:
                # Intentar cargar una fuente personalizada
                font = ImageFont.truetype("arial.ttf", 24)
            except IOError:
                # Usar fuente por defecto si no se encuentra la personalizada
                font = ImageFont.load_default()
            
            # Posición del texto (esquina inferior izquierda con margen)
            text_position = (20, img.height - 40)
            
            # Añadir fondo semitransparente al texto
            text_bbox = draw.textbbox((0, 0), self.watermark_text, font=font)
            text_width = text_bbox[2] - text_bbox[0]
            text_height = text_bbox[3] - text_bbox[1]
            
            # Crear fondo para el texto
            background = Image.new('RGBA', (text_width + 20, text_height + 10), (0, 0, 0, 128))
            watermark.paste(background, (text_position[0]-10, text_position[1]-5), background)
            
            # Dibujar el texto
            draw.text(text_position, self.watermark_text, font=font, fill=(255, 255, 255, int(255 * self.opacity)))
            
            # Combinar la imagen original con la marca de agua
            result = Image.alpha_composite(img, watermark)
            
            # Guardar el resultado
            if not output_path:
                # Si no se especifica ruta de salida, crear un archivo temporal
                _, ext = os.path.splitext(image_path)
                fd, output_path = tempfile.mkstemp(suffix=ext)
                os.close(fd)
            
            # Convertir a RGB si es necesario para guardar en formatos que no soportan alpha
            if output_path.lower().endswith(('.jpg', '.jpeg')):
                result = result.convert('RGB')
            
            result.save(output_path)
            return output_path
            
        except Exception as e:
            print(f"Error al procesar la imagen: {str(e)}")
            return image_path  # Devolver la ruta original en caso de error
    
    def add_watermark_to_video(self, video_path, output_path=None):
        """
        Añade marca de agua a un video
        
        Args:
            video_path (str): Ruta al video original
            output_path (str, optional): Ruta para guardar el video con marca de agua
            
        Returns:
            str: Ruta del video procesado
        """
        try:
            # Crear un archivo temporal para el video de salida si no se especifica
            if not output_path:
                _, ext = os.path.splitext(video_path)
                fd, output_path = tempfile.mkstemp(suffix=ext)
                os.close(fd)
            
            # Cargar el video
            video = VideoFileClip(video_path)
            
            # Crear marca de agua de texto
            txt_clip = (TextClip(self.watermark_text, fontsize=24, color='white',
                              font='Arial-Bold',
                              stroke_color='black', stroke_width=1)
                      .set_position(('left', 'bottom'))
                      .set_duration(video.duration)
                      .set_opacity(self.opacity))
            
            # Combinar el video con la marca de agua
            result = CompositeVideoClip([video, txt_clip])
            
            # Guardar el video resultante
            result.write_videofile(output_path, codec='libx264', audio_codec='aac',
                                 temp_audiofile='temp-audio.m4a',
                                 remove_temp=True, threads=4)
            
            return output_path
            
        except Exception as e:
            print(f"Error al procesar el video: {str(e)}")
            return video_path  # Devolver la ruta original en caso de error

# Ejemplo de uso
if __name__ == "__main__":
    # Configurar el procesador con un logo (opcional)
    processor = MediaProcessor(logo_path="logo.png")
    
    # Procesar una imagen
    processed_image = processor.add_watermark_to_image("ejemplo.jpg")
    print(f"Imagen procesada guardada en: {processed_image}")
    
    # Procesar un video (descomentar para usar)
    # processed_video = processor.add_watermark_to_video("video_ejemplo.mp4")
    # print(f"Video procesado guardado en: {processed_video}")
