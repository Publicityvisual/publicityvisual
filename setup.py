import os
import requests
from tqdm import tqdm

def download_file(url, filename):
    """Descargar archivo con barra de progreso"""
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    
    # Verificar si el archivo ya existe
    if os.path.exists(filename):
        print(f"El archivo {filename} ya existe. Omitiendo descarga.")
        return True
    
    print(f"Descargando {filename}...")
    
    # Descargar el archivo
    response = requests.get(url, stream=True)
    response.raise_for_status()
    
    # Obtener el tamaño total del archivo
    total_size = int(response.headers.get('content-length', 0))
    block_size = 1024  # 1 Kibibyte
    
    with open(filename, 'wb') as file, tqdm(
        desc=filename,
        total=total_size,
        unit='iB',
        unit_scale=True,
        unit_divisor=1024,
    ) as bar:
        for data in response.iter_content(block_size):
            size = file.write(data)
            bar.update(size)
    
    return True

def main():
    # Crear directorio para modelos si no existe
    os.makedirs("models", exist_ok=True)
    
    # URL del modelo LLaMA 3 (8B parámetros, formato GGUF)
    # Nota: Asegúrate de tener los permisos necesarios para usar este modelo
    model_url = "https://huggingface.co/TheBloke/Llama-3-8B-Instruct-GGUF/resolve/main/llama-3-8b-instruct.Q4_K_M.gguf"
    model_path = "./models/llama-3-8b-instruct.gguf"
    
    try:
        # Descargar el modelo
        download_file(model_url, model_path)
        print("\n¡Configuración completada! Ahora puedes ejecutar la API con:")
        print("python main.py")
    except Exception as e:
        print(f"Error durante la descarga: {e}")
        print("\nPor favor, descarga manualmente el modelo desde:")
        print("https://huggingface.co/TheBloke/Llama-3-8B-Instruct-GGUF")
        print(f"Y colócalo en: {os.path.abspath(model_path)}")

if __name__ == "__main__":
    main()
