import React from 'react';
import CodeExample from '../components/CodeExample';

const ControlStructures: React.FC = () => {
  const examples = [
    {
      title: "Estructuras Condicionales: if-else",
      description: "Toma decisiones en tu código basadas en condiciones",
      code: `// Estructuras condicionales en Java

public class Condicionales {
    public static void main(String[] args) {
        int edad = 18;
        double nota = 85.5;
        
        // if-else simple
        if (edad >= 18) {
            System.out.println("Eres mayor de edad");
        } else {
            System.out.println("Eres menor de edad");
        }
        
        // if-else if-else anidados
        if (nota >= 90) {
            System.out.println("Excelente");
        } else if (nota >= 80) {
            System.out.println("Bueno");
        } else if (nota >= 70) {
            System.out.println("Regular");
        } else {
            System.out.println("Necesitas mejorar");
        }
        
        // Operador ternario (versión corta de if-else)
        String mensaje = (edad >= 18) ? "Mayor de edad" : "Menor de edad";
        System.out.println(mensaje);
        
        // Condiciones compuestas
        boolean tieneLicencia = true;
        if (edad >= 18 && tieneLicencia) {
            System.out.println("Puedes conducir");
        }
        
        boolean esEstudiante = true;
        boolean esMayor = edad >= 18;
        if (esEstudiante || esMayor) {
            System.out.println("Tienes descuento");
        }
    }
}`,
      explanation: "Las estructuras condicionales permiten que tu programa tome decisiones. El if ejecuta código si una condición es verdadera. El else if permite verificar múltiples condiciones en orden. El else se ejecuta si ninguna condición anterior fue verdadera. El operador ternario (condición ? valor_si_true : valor_si_false) es una forma compacta de if-else simple."
    },
    {
      title: "Estructura Switch",
      description: "Maneja múltiples casos de forma organizada",
      code: `// Estructura switch en Java

public class SwitchDemo {
    public static void main(String[] args) {
        int diaSemana = 3;
        String categoria = "A";
        char calificacion = 'B';
        
        // Switch con números
        switch (diaSemana) {
            case 1:
                System.out.println("Lunes");
                break;
            case 2:
                System.out.println("Martes");
                break;
            case 3:
                System.out.println("Miércoles");
                break;
            case 4:
                System.out.println("Jueves");
                break;
            case 5:
                System.out.println("Viernes");
                break;
            case 6:
            case 7:
                System.out.println("Fin de semana");
                break;
            default:
                System.out.println("Día inválido");
        }
        
        // Switch con strings (Java 7+)
        switch (categoria) {
            case "A":
                System.out.println("Excelente");
                break;
            case "B":
                System.out.println("Bueno");
                break;
            case "C":
                System.out.println("Regular");
                break;
            default:
                System.out.println("Categoría no válida");
        }
        
        // Switch con expresiones (Java 14+)
        int resultado = switch (calificacion) {
            case 'A' -> 10;
            case 'B' -> 8;
            case 'C' -> 6;
            case 'D' -> 4;
            default -> 0;
        };
        System.out.println("Puntuación: " + resultado);
    }
}`,
      explanation: "El switch es útil cuando tienes múltiples casos para una misma variable. Cada case representa un valor posible y break evita que se ejecuten los casos siguientes. El default se ejecuta si ningún case coincide. Desde Java 14, puedes usar switch con expresiones que retornan valores usando la sintaxis de flecha (->)."
    },
    {
      title: "Bucle For",
      description: "Repite código un número determinado de veces",
      code: `// Bucle for en Java

public class BucleFor {
    public static void main(String[] args) {
        // For tradicional
        System.out.println("=== For tradicional ===");
        for (int i = 0; i < 5; i++) {
            System.out.println("Iteración: " + i);
        }
        
        // For con variables múltiples
        System.out.println("\\n=== For con múltiples variables ===");
        for (int i = 0, j = 10; i < 5; i++, j -= 2) {
            System.out.println("i: " + i + ", j: " + j);
        }
        
        // For-each (para arrays y colecciones)
        System.out.println("\\n=== For-each ===");
        String[] nombres = {"Ana", "Juan", "María", "Pedro"};
        for (String nombre : nombres) {
            System.out.println("Hola, " + nombre);
        }
        
        // For anidado
        System.out.println("\\n=== For anidado (tabla de multiplicar) ===");
        for (int i = 1; i <= 3; i++) {
            for (int j = 1; j <= 5; j++) {
                System.out.printf("%d x %d = %d\\t", i, j, i * j);
            }
            System.out.println(); // Salto de línea
        }
        
        // For con continue y break
        System.out.println("\\n=== For con control de flujo ===");
        for (int i = 0; i < 10; i++) {
            if (i == 3) {
                continue; // Salta la iteración 3
            }
            if (i == 7) {
                break; // Termina el bucle
            }
            System.out.println("Número: " + i);
        }
    }
}`,
      explanation: "El bucle for tiene tres partes: inicialización (int i = 0), condición (i < 5), y actualización (i++). El for-each simplifica la iteración sobre arrays y colecciones. Los bucles anidados permiten combinaciones (como tablas de multiplicar). 'continue' salta a la siguiente iteración, mientras que 'break' termina el bucle completamente."
    },
    {
      title: "Bucles While y Do-While",
      description: "Repite código mientras una condición sea verdadera",
      code: `// Bucles while y do-while en Java

public class WhileDoWhile {
    public static void main(String[] args) {
        // Bucle while
        System.out.println("=== Bucle while ===");
        int contador = 1;
        while (contador <= 5) {
            System.out.println("Contador: " + contador);
            contador++; // Importante: actualizar la variable
        }
        
        // Bucle do-while
        System.out.println("\\n=== Bucle do-while ===");
        int numero = 1;
        do {
            System.out.println("Número: " + numero);
            numero++;
        } while (numero <= 3);
        
        // Diferencia clave
        System.out.println("\\n=== Diferencia entre while y do-while ===");
        
        // while: la condición se evalúa antes
        int x = 10;
        while (x < 5) {
            System.out.println("Esto nunca se ejecuta");
        }
        
        // do-while: se ejecuta al menos una vez
        int y = 10;
        do {
            System.out.println("Esto se ejecuta una vez");
        } while (y < 5);
        
        // Ejemplo práctico: validación de entrada
        System.out.println("\\n=== Validación con do-while ===");
        java.util.Scanner scanner = new java.util.Scanner(System.in);
        int edad;
        
        do {
            System.out.print("Ingresa tu edad (0-120): ");
            edad = scanner.nextInt();
            
            if (edad < 0 || edad > 120) {
                System.out.println("Edad inválida. Intenta nuevamente.");
            }
        } while (edad < 0 || edad > 120);
        
        System.out.println("Edad válida: " + edad);
        scanner.close();
    }
}`,
      explanation: "El while verifica la condición antes de ejecutar el código, por lo que puede que nunca se ejecute. El do-while ejecuta el código al menos una vez y luego verifica la condición. Son útiles cuando no sabes cuántas iteraciones necesitas. El do-while es ideal para validación de entrada, ya que garantiza al menos una solicitud al usuario."
    },
    {
      title: "Control de Flujo Avanzado",
      description: "Break, Continue y Return en bucles",
      code: `// Control de flujo avanzado en bucles

public class ControlFlujoAvanzado {
    public static void main(String[] args) {
        // Break etiquetado (para salir de bucles anidados)
        System.out.println("=== Break etiquetado ===");
        buscarNumero:
        for (int i = 1; i <= 3; i++) {
            for (int j = 1; j <= 3; j++) {
                System.out.printf("Buscando en [%d][%d]\\n", i, j);
                if (i == 2 && j == 2) {
                    System.out.println("¡Encontrado! Saliendo de todos los bucles");
                    break buscarNumero; // Sale del bucle etiquetado
                }
            }
        }
        
        // Continue etiquetado
        System.out.println("\\n=== Continue etiquetado ===");
        externo:
        for (int i = 1; i <= 3; i++) {
            for (int j = 1; j <= 3; j++) {
                if (j == 2) {
                    continue externo; // Salta a la siguiente iteración del bucle externo
                }
                System.out.printf("Posición [%d][%d]\\n", i, j);
            }
        }
        
        // Return dentro de bucle
        System.out.println("\\n=== Return en bucle ===");
        System.out.println("Procesando números...");
        procesarNumeros();
    }
    
    public static void procesarNumeros() {
        for (int i = 1; i <= 10; i++) {
            if (i == 5) {
                System.out.println("Número 5 encontrado. Terminando proceso.");
                return; // Sale del método completamente
            }
            System.out.println("Procesando: " + i);
        }
        System.out.println("Proceso completado"); // Nunca se ejecuta si se encuentra el 5
    }
}`,
      explanation: "El break etiquetado permite salir de bucles anidados específicos. El continue etiquetado salta a la siguiente iteración de un bucle externo. El return dentro de un bucle no solo sale del bucle, sino que termina la ejecución del método completo. Estas técnicas son útiles para controlar el flujo en estructuras complejas."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Estructuras de Control</h1>
        <p className="text-lg text-gray-600 mb-6">
          Aprende a controlar el flujo de tu programa con condicionales y bucles.
        </p>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Nota:</strong> Las estructuras de control son fundamentales para crear programas 
                dinámicos que respondan a diferentes condiciones y repitan tareas eficientemente.
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

      <div className="mt-8 bg-purple-50 border-l-4 border-purple-400 p-4">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-purple-700">
              <strong>Ejercicio práctico:</strong> Crea un programa que pida al usuario un número y 
              determine si es par o impar, si es positivo o negativo, y muestre su tabla de multiplicar 
              hasta el 10 usando diferentes estructuras de control.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlStructures;
