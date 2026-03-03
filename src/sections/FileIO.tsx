import React from 'react';
import CodeExample from '../components/CodeExample';

const FileIO: React.FC = () => {
  const basicFileIOCode = `// FILE I/O - LECTURA Y ESCRITURA BÁSICA

import java.io.*;
import java.nio.file.*;
import java.util.List;
import java.util.ArrayList;

public class FileIOBasico {
    
    // ========== ESCRITURA DE ARCHIVOS ==========
    
    // 1. FileWriter - Escritura simple
    public static void escribirConFileWriter(String archivo, String contenido) {
        try {
            FileWriter writer = new FileWriter(archivo);
            writer.write(contenido);
            writer.close();
            System.out.println("Archivo escrito exitosamente");
        } catch (IOException e) {
            System.err.println("Error al escribir: " + e.getMessage());
        }
    }
    
    // 2. BufferedWriter - Escritura eficiente
    public static void escribirConBufferedWriter(String archivo, List<String> lineas) {
        try {
            BufferedWriter writer = new BufferedWriter(new FileWriter(archivo));
            for (String linea : lineas) {
                writer.write(linea);
                writer.newLine(); // Salto de línea
            }
            writer.close();
            System.out.println("Líneas escritas: " + lineas.size());
        } catch (IOException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }
    
    // 3. PrintWriter - Escritura con formato
    public static void escribirConPrintWriter(String archivo) {
        try {
            PrintWriter writer = new PrintWriter(archivo);
            writer.println("Primera línea");
            writer.printf("Número: %d, Decimal: %.2f%n", 42, 3.14159);
            writer.println("Última línea");
            writer.close();
        } catch (FileNotFoundException e) {
            System.err.println("No se pudo crear el archivo");
        }
    }
    
    // ========== LECTURA DE ARCHIVOS ==========
    
    // 1. FileReader - Lectura simple
    public static void leerConFileReader(String archivo) {
        try {
            FileReader reader = new FileReader(archivo);
            int caracter;
            while ((caracter = reader.read()) != -1) {
                System.out.print((char) caracter);
            }
            reader.close();
        } catch (IOException e) {
            System.err.println("Error al leer: " + e.getMessage());
        }
    }
    
    // 2. BufferedReader - Lectura eficiente línea por línea
    public static List<String> leerConBufferedReader(String archivo) {
        List<String> lineas = new ArrayList<>();
        try {
            BufferedReader reader = new BufferedReader(new FileReader(archivo));
            String linea;
            while ((linea = reader.readLine()) != null) {
                lineas.add(linea);
            }
            reader.close();
            System.out.println("Líneas leídas: " + lineas.size());
        } catch (IOException e) {
            System.err.println("Error: " + e.getMessage());
        }
        return lineas;
    }
    
    // 3. Scanner - Lectura con parsing
    public static void leerConScanner(String archivo) {
        try {
            Scanner scanner = new Scanner(new File(archivo));
            while (scanner.hasNextLine()) {
                String linea = scanner.nextLine();
                System.out.println(linea);
            }
            scanner.close();
        } catch (FileNotFoundException e) {
            System.err.println("Archivo no encontrado");
        }
    }
    
    // ========== EJEMPLO DE USO ==========
    
    public static void main(String[] args) {
        String archivo = "datos.txt";
        
        // Escribir
        List<String> lineas = new ArrayList<>();
        lineas.add("Java File I/O");
        lineas.add("Línea 2");
        lineas.add("Línea 3");
        escribirConBufferedWriter(archivo, lineas);
        
        // Leer
        List<String> contenido = leerConBufferedReader(archivo);
        contenido.forEach(System.out::println);
    }
}`;

  const tryWithResourcesCode = `// TRY-WITH-RESOURCES - MANEJO AUTOMÁTICO DE RECURSOS

import java.io.*;
import java.util.Scanner;

public class TryWithResources {
    
    // ========== PROBLEMA SIN TRY-WITH-RESOURCES ==========
    
    public static void leerArchivoAntiguo(String archivo) {
        BufferedReader reader = null;
        try {
            reader = new BufferedReader(new FileReader(archivo));
            String linea;
            while ((linea = reader.readLine()) != null) {
                System.out.println(linea);
            }
        } catch (IOException e) {
            System.err.println("Error: " + e.getMessage());
        } finally {
            // Debemos cerrar manualmente
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e) {
                    System.err.println("Error al cerrar: " + e.getMessage());
                }
            }
        }
    }
    
    // ========== SOLUCIÓN CON TRY-WITH-RESOURCES ==========
    
    // El recurso se cierra automáticamente
    public static void leerArchivoModerno(String archivo) {
        try (BufferedReader reader = new BufferedReader(new FileReader(archivo))) {
            String linea;
            while ((linea = reader.readLine()) != null) {
                System.out.println(linea);
            }
        } catch (IOException e) {
            System.err.println("Error: " + e.getMessage());
        }
        // reader.close() se llama automáticamente
    }
    
    // Múltiples recursos
    public static void copiarArchivo(String origen, String destino) {
        try (
            BufferedReader reader = new BufferedReader(new FileReader(origen));
            BufferedWriter writer = new BufferedWriter(new FileWriter(destino))
        ) {
            String linea;
            while ((linea = reader.readLine()) != null) {
                writer.write(linea);
                writer.newLine();
            }
            System.out.println("Archivo copiado exitosamente");
        } catch (IOException e) {
            System.err.println("Error al copiar: " + e.getMessage());
        }
        // Ambos recursos se cierran automáticamente
    }
    
    // Con Scanner
    public static void leerConScanner(String archivo) {
        try (Scanner scanner = new Scanner(new File(archivo))) {
            while (scanner.hasNextLine()) {
                System.out.println(scanner.nextLine());
            }
        } catch (FileNotFoundException e) {
            System.err.println("Archivo no encontrado: " + e.getMessage());
        }
    }
    
    // Escribir y leer en una operación
    public static void procesarArchivo(String entrada, String salida) {
        try (
            BufferedReader reader = new BufferedReader(new FileReader(entrada));
            PrintWriter writer = new PrintWriter(salida)
        ) {
            String linea;
            int numeroLinea = 1;
            while ((linea = reader.readLine()) != null) {
                // Agregar número de línea
                writer.printf("%d: %s%n", numeroLinea++, linea);
            }
            System.out.println("Procesamiento completado");
        } catch (IOException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }
    
    // Recurso personalizado (implementa AutoCloseable)
    static class MiRecurso implements AutoCloseable {
        private String nombre;
        
        public MiRecurso(String nombre) {
            this.nombre = nombre;
            System.out.println("Abriendo recurso: " + nombre);
        }
        
        public void usar() {
            System.out.println("Usando recurso: " + nombre);
        }
        
        @Override
        public void close() {
            System.out.println("Cerrando recurso: " + nombre);
        }
    }
    
    public static void usarRecursoPersonalizado() {
        try (MiRecurso recurso = new MiRecurso("Mi Recurso")) {
            recurso.usar();
        } // close() se llama automáticamente
    }
}

/*
VENTAJAS DE TRY-WITH-RESOURCES:

1. Código más limpio y legible
2. Cierre automático garantizado
3. Manejo correcto de excepciones en close()
4. Menos código boilerplate
5. Previene resource leaks

REQUISITOS:
- El recurso debe implementar AutoCloseable o Closeable
- Disponible desde Java 7
*/`;

  const nioFilesCode = `// NIO (NEW I/O) - API MODERNA DE ARCHIVOS

import java.nio.file.*;
import java.nio.charset.StandardCharsets;
import java.io.IOException;
import java.util.List;
import java.util.stream.Stream;

public class NIOFiles {
    
    // ========== LECTURA DE ARCHIVOS ==========
    
    // Leer todas las líneas (archivos pequeños)
    public static void leerTodasLineas(String archivo) {
        try {
            Path path = Paths.get(archivo);
            List<String> lineas = Files.readAllLines(path, StandardCharsets.UTF_8);
            
            System.out.println("Total de líneas: " + lineas.size());
            lineas.forEach(System.out::println);
        } catch (IOException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }
    
    // Leer todo el contenido como String
    public static void leerComoString(String archivo) {
        try {
            Path path = Paths.get(archivo);
            String contenido = Files.readString(path, StandardCharsets.UTF_8);
            System.out.println(contenido);
        } catch (IOException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }
    
    // Leer con Stream (archivos grandes)
    public static void leerConStream(String archivo) {
        Path path = Paths.get(archivo);
        try (Stream<String> lineas = Files.lines(path)) {
            lineas
                .filter(linea -> !linea.isEmpty())
                .map(String::toUpperCase)
                .forEach(System.out::println);
        } catch (IOException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }
    
    // ========== ESCRITURA DE ARCHIVOS ==========
    
    // Escribir lista de líneas
    public static void escribirLineas(String archivo, List<String> lineas) {
        try {
            Path path = Paths.get(archivo);
            Files.write(path, lineas, StandardCharsets.UTF_8);
            System.out.println("Archivo escrito exitosamente");
        } catch (IOException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }
    
    // Escribir String
    public static void escribirString(String archivo, String contenido) {
        try {
            Path path = Paths.get(archivo);
            Files.writeString(path, contenido, StandardCharsets.UTF_8);
            System.out.println("Contenido escrito");
        } catch (IOException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }
    
    // Agregar al final del archivo
    public static void agregarLinea(String archivo, String linea) {
        try {
            Path path = Paths.get(archivo);
            Files.writeString(
                path, 
                linea + System.lineSeparator(), 
                StandardCharsets.UTF_8,
                StandardOpenOption.APPEND
            );
        } catch (IOException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }
    
    // ========== OPERACIONES DE ARCHIVOS ==========
    
    // Verificar existencia
    public static boolean existeArchivo(String archivo) {
        Path path = Paths.get(archivo);
        return Files.exists(path);
    }
    
    // Crear archivo
    public static void crearArchivo(String archivo) {
        try {
            Path path = Paths.get(archivo);
            Files.createFile(path);
            System.out.println("Archivo creado");
        } catch (IOException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }
    
    // Eliminar archivo
    public static void eliminarArchivo(String archivo) {
        try {
            Path path = Paths.get(archivo);
            Files.delete(path);
            System.out.println("Archivo eliminado");
        } catch (IOException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }
    
    // Copiar archivo
    public static void copiarArchivo(String origen, String destino) {
        try {
            Path pathOrigen = Paths.get(origen);
            Path pathDestino = Paths.get(destino);
            Files.copy(pathOrigen, pathDestino, StandardCopyOption.REPLACE_EXISTING);
            System.out.println("Archivo copiado");
        } catch (IOException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }
    
    // Mover archivo
    public static void moverArchivo(String origen, String destino) {
        try {
            Path pathOrigen = Paths.get(origen);
            Path pathDestino = Paths.get(destino);
            Files.move(pathOrigen, pathDestino, StandardCopyOption.REPLACE_EXISTING);
            System.out.println("Archivo movido");
        } catch (IOException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }
    
    // Obtener información del archivo
    public static void infoArchivo(String archivo) {
        try {
            Path path = Paths.get(archivo);
            System.out.println("Tamaño: " + Files.size(path) + " bytes");
            System.out.println("Es directorio: " + Files.isDirectory(path));
            System.out.println("Es archivo regular: " + Files.isRegularFile(path));
            System.out.println("Es legible: " + Files.isReadable(path));
            System.out.println("Es escribible: " + Files.isWritable(path));
        } catch (IOException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }
    
    // Listar archivos en directorio
    public static void listarDirectorio(String directorio) {
        try (Stream<Path> paths = Files.list(Paths.get(directorio))) {
            paths
                .filter(Files::isRegularFile)
                .forEach(System.out::println);
        } catch (IOException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }
    
    // Buscar archivos
    public static void buscarArchivos(String directorio, String extension) {
        try (Stream<Path> paths = Files.walk(Paths.get(directorio))) {
            paths
                .filter(Files::isRegularFile)
                .filter(p -> p.toString().endsWith(extension))
                .forEach(System.out::println);
        } catch (IOException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }
}

/*
VENTAJAS DE NIO (java.nio.file):

1. API más simple y moderna
2. Mejor manejo de errores
3. Soporte para operaciones atómicas
4. Integración con Streams
5. Mejor rendimiento
6. Operaciones de archivos más completas

CUÁNDO USAR:
- NIO: Para nuevos proyectos (recomendado)
- java.io: Para código legacy o compatibilidad
*/`;

  const examples = [
    {
      title: "File I/O - Lectura y Escritura Básica",
      description: "Trabajar con archivos usando java.io",
      code: basicFileIOCode,
      explanation: "Java proporciona varias clases para trabajar con archivos. FileWriter/FileReader son básicas pero ineficientes. BufferedWriter/BufferedReader son más eficientes al usar buffer. PrintWriter permite escritura con formato (printf). Scanner permite lectura con parsing. Siempre cierra los recursos con close() o usa try-with-resources. BufferedReader.readLine() retorna null al final del archivo. FileWriter sobrescribe, usa FileWriter(archivo, true) para agregar."
    },
    {
      title: "Try-With-Resources - Manejo Automático",
      description: "Cierre automático de recursos con try-with-resources",
      code: tryWithResourcesCode,
      explanation: "Try-with-resources (Java 7+) cierra automáticamente recursos que implementan AutoCloseable. Elimina la necesidad de finally y close() manual. Previene resource leaks. Puede manejar múltiples recursos separados por punto y coma. Los recursos se cierran en orden inverso a su declaración. Si ocurre excepción en close(), se suprime y se lanza la excepción principal. Código más limpio, seguro y mantenible. Siempre preferir try-with-resources sobre try-finally."
    },
    {
      title: "NIO - API Moderna de Archivos",
      description: "java.nio.file - API moderna y eficiente",
      code: nioFilesCode,
      explanation: "NIO (New I/O) es la API moderna de archivos en Java. Files.readAllLines() lee todo el archivo en memoria (solo archivos pequeños). Files.lines() retorna Stream para archivos grandes. Files.writeString()/readString() trabajan con String directamente. Path representa rutas de archivos. StandardOpenOption controla cómo abrir archivos (APPEND, CREATE, etc.). Files.walk() recorre directorios recursivamente. NIO es más simple, eficiente y expresivo que java.io. Integra perfectamente con Streams API. Usa NIO para nuevos proyectos."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">File I/O - Entrada y Salida de Archivos</h1>
        <p className="text-lg text-gray-600 mb-6">
          Lectura y escritura de archivos en Java: java.io tradicional, try-with-resources y NIO moderno.
        </p>
        
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>File I/O Esencial:</strong> Trabajar con archivos es fundamental en aplicaciones reales.
                Java ofrece dos APIs: java.io (tradicional) y java.nio.file (moderna). Para nuevos proyectos,
                usa NIO que es más simple y eficiente. Siempre cierra recursos con try-with-resources.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {examples.map((example, index) => (
          <CodeExample
            key={index}
            title={example.title}
            description={example.description}
            code={example.code}
            explanation={example.explanation}
          />
        ))}
      </div>

      <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <strong>Mejores prácticas File I/O:</strong> Siempre usa try-with-resources para cerrar recursos
              automáticamente. Usa BufferedReader/Writer para mejor rendimiento. Especifica charset explícitamente
              (UTF-8). Para archivos grandes usa Streams. Maneja IOException apropiadamente. Valida que el archivo
              existe antes de leer. Usa NIO para nuevos proyectos. No cargues archivos enormes en memoria.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileIO;
