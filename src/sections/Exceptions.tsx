import React from 'react';
import CodeExample from '../components/CodeExample';

const Exceptions: React.FC = () => {
  const examples = [
    {
      title: "Conceptos Básicos de Excepciones",
      description: "Entiende qué son las excepciones y cómo manejarlas",
      code: `// Conceptos básicos de excepciones en Java

public class ExcepcionesBasicas {
    public static void main(String[] args) {
        // Ejemplo de excepción no controlada
        System.out.println("=== División por cero ===");
        try {
            int resultado = 10 / 0; // Esto lanzará ArithmeticException
            System.out.println("Resultado: " + resultado);
        } catch (ArithmeticException e) {
            System.out.println("Error: " + e.getMessage());
            System.out.println("Tipo de excepción: " + e.getClass().getSimpleName());
        }
        
        // Ejemplo con acceso a array fuera de límites
        System.out.println("\\n=== Acceso a array ===");
        try {
            int[] numeros = {1, 2, 3};
            System.out.println("Elemento en índice 5: " + numeros[5]);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Error: Índice fuera de los límites del array");
            System.out.println("Mensaje: " + e.getMessage());
        }
        
        // Ejemplo con conversión de tipo
        System.out.println("\\n=== Conversión de tipo ===");
        try {
            String texto = "abc";
            int numero = Integer.parseInt(texto);
            System.out.println("Número: " + numero);
        } catch (NumberFormatException e) {
            System.out.println("Error: No se puede convertir '" + texto + "' a número");
        }
        
        // Bloque finally (siempre se ejecuta)
        System.out.println("\\n=== Bloque finally ===");
        try {
            System.out.println("Intentando operación...");
            int x = 5 / 0;
        } catch (ArithmeticException e) {
            System.out.println("Capturada excepción aritmética");
        } finally {
            System.out.println("Este bloque siempre se ejecuta");
        }
        
        // Ejemplo con recursos (try-with-resources)
        System.out.println("\\n=== Try-with-resources ===");
        try (java.util.Scanner scanner = new java.util.Scanner("Hola mundo")) {
            String linea = scanner.nextLine();
            System.out.println("Leído: " + linea);
        } // El scanner se cierra automáticamente
    }
}`,
      explanation: "Las excepciones son eventos que interrumpen el flujo normal del programa. Java usa el mecanismo try-catch-finally para manejarlas. El bloque try contiene código que puede lanzar excepciones, catch maneja excepciones específicas, y finally siempre se ejecuta (útil para liberar recursos). El try-with-resources (Java 7+) cierra automáticamente recursos que implementan AutoCloseable."
    },
    {
      title: "Jerarquía de Excepciones",
      description: "Conoce los diferentes tipos de excepciones y su relación",
      code: `// Jerarquía de excepciones en Java

import java.io.*;
import java.util.*;

public class JerarquiaExcepciones {
    
    // Método que lanza excepción verificada
    public static void leerArchivo() throws IOException {
        // Simulación de lectura de archivo
        throw new IOException("No se puede leer el archivo");
    }
    
    // Método que lanza excepción no verificada
    public static void procesarLista() {
        List<String> lista = Arrays.asList("A", "B");
        // Esto lanzará IndexOutOfBoundsException (no verificada)
        String elemento = lista.get(5);
    }
    
    public static void main(String[] args) {
        System.out.println("=== Excepción verificada (Checked) ===");
        try {
            leerArchivo();
        } catch (IOException e) {
            System.out.println("Capturada IOException: " + e.getMessage());
        }
        
        System.out.println("\\n=== Excepción no verificada (Unchecked) ===");
        try {
            procesarLista();
        } catch (IndexOutOfBoundsException e) {
            System.out.println("Capturada IndexOutOfBoundsException: " + e.getMessage());
        }
        
        // Capturar múltiples excepciones
        System.out.println("\\n=== Múltiples catches ===");
        String[] pruebas = {"123", "abc", null, "45.67"};
        
        for (String prueba : pruebas) {
            try {
                if (prueba == null) {
                    throw new IllegalArgumentException("El valor no puede ser nulo");
                }
                int numero = Integer.parseInt(prueba);
                System.out.println("Número válido: " + numero);
            } catch (NumberFormatException e) {
                System.out.println("Error de formato: " + prueba);
            } catch (IllegalArgumentException e) {
                System.out.println("Argumento inválido: " + e.getMessage());
            } catch (Exception e) {
                System.out.println("Error general: " + e.getMessage());
            }
        }
        
        // Multi-catch (Java 7+)
        System.out.println("\\n=== Multi-catch ===");
        Object[] objetos = {"texto", 123, 45.67, true};
        
        for (Object obj : objetos) {
            try {
                String resultado = (String) obj;
                System.out.println("Convertido a String: " + resultado);
            } catch (ClassCastException | NullPointerException e) {
                System.out.println("Error de conversión: " + obj.getClass().getSimpleName());
            }
        }
        
        // Jerarquía de excepciones más comunes
        System.out.println("\\n=== Jerarquía de excepciones ===");
        System.out.println("Throwable");
        System.out.println("├── Error (errores graves, no recuperar)");
        System.out.println("└── Exception");
        System.out.println("    ├── RuntimeException (no verificadas)");
        System.out.println("    │   ├── NullPointerException");
        System.out.println("    │   ├── ArrayIndexOutOfBoundsException");
        System.out.println("    │   ├── IllegalArgumentException");
        System.out.println("    │   └── NumberFormatException");
        System.out.println("    └── Excepciones verificadas");
        System.out.println("        ├── IOException");
        System.out.println("        ├── SQLException");
        System.out.println("        └── ClassNotFoundException");
    }
}`,
      explanation: "La jerarquía de excepciones en Java comienza con Throwable. Error representa errores graves del sistema que no deben manejarse. Exception se divide en RuntimeException (no verificadas, no requieren manejo obligatorio) y excepciones verificadas (requieren manejo con try-catch o throws). Las excepciones verificadas incluyen IOException, SQLException, etc., mientras que las no verificadas incluyen NullPointerException, ArrayIndexOutOfBoundsException, etc."
    },
    {
      title: "Crear Excepciones Personalizadas",
      description: "Define tus propias excepciones para errores específicos de tu dominio",
      code: `// Excepciones personalizadas en Java

// Excepción personalizada verificada
class SaldoInsuficienteException extends Exception {
    public SaldoInsuficienteException(String mensaje) {
        super(mensaje);
    }
    
    public SaldoInsuficienteException(String mensaje, Throwable causa) {
        super(mensaje, causa);
    }
}

// Excepción personalizada no verificada
class MontoInvalidoException extends RuntimeException {
    public MontoInvalidoException(String mensaje) {
        super(mensaje);
    }
}

// Excepción con información adicional
class TransaccionException extends Exception {
    private String idTransaccion;
    private double monto;
    
    public TransaccionException(String idTransaccion, double monto, String mensaje) {
        super(mensaje);
        this.idTransaccion = idTransaccion;
        this.monto = monto;
    }
    
    public String getIdTransaccion() {
        return idTransaccion;
    }
    
    public double getMonto() {
        return monto;
    }
    
    @Override
    public String toString() {
        return String.format("TransaccionException{id='%s', monto=%.2f, mensaje='%s'}", 
                           idTransaccion, monto, getMessage());
    }
}

// Clase que utiliza las excepciones personalizadas
class CuentaBancaria {
    private String numeroCuenta;
    private double saldo;
    private static final double SALDO_MINIMO = 100.0;
    
    public CuentaBancaria(String numeroCuenta, double saldoInicial) {
        this.numeroCuenta = numeroCuenta;
        this.saldo = saldoInicial;
    }
    
    public void depositar(double monto) throws MontoInvalidoException {
        if (monto <= 0) {
            throw new MontoInvalidoException("El monto debe ser positivo: " + monto);
        }
        
        if (monto > 10000) {
            throw new MontoInvalidoException("El monto excede el límite permitido: " + monto);
        }
        
        saldo += monto;
        System.out.println("Depósito exitoso: $" + monto);
    }
    
    public void retirar(double monto, String idTransaccion) 
            throws SaldoInsuficienteException, TransaccionException {
        
        if (monto <= 0) {
            throw new MontoInvalidoException("El monto debe ser positivo: " + monto);
        }
        
        if (monto > saldo) {
            throw new SaldoInsuficienteException(
                String.format("Saldo insuficiente. Intenta retirar $%.2f, saldo disponible: $%.2f", 
                             monto, saldo));
        }
        
        if (saldo - monto < SALDO_MINIMO) {
            throw new TransaccionException(idTransaccion, monto, 
                "La transacción dejaría el saldo por debajo del mínimo permitido");
        }
        
        saldo -= monto;
        System.out.println("Retiro exitoso: $" + monto);
    }
    
    public double getSaldo() {
        return saldo;
    }
    
    public String getNumeroCuenta() {
        return numeroCuenta;
    }
}

// Uso de excepciones personalizadas
public class ExcepcionesPersonalizadas {
    public static void main(String[] args) {
        CuentaBancaria cuenta = new CuentaBancaria("12345", 500.0);
        
        // Casos de prueba
        realizarOperaciones(cuenta, "depositar", 200.0);
        realizarOperaciones(cuenta, "depositar", -50.0);
        realizarOperaciones(cuenta, "depositar", 15000.0);
        realizarOperaciones(cuenta, "retirar", 300.0, "TX001");
        realizarOperaciones(cuenta, "retirar", 1000.0, "TX002");
        
        // Capturar excepción con información adicional
        try {
            cuenta.retirar(200.0, "TX003");
        } catch (TransaccionException e) {
            System.out.println("Error en transacción:");
            System.out.println("ID: " + e.getIdTransaccion());
            System.out.println("Monto: $" + e.getMonto());
            System.out.println("Motivo: " + e.getMessage());
        } catch (SaldoInsuficienteException | MontoInvalidoException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
    
    private static void realizarOperaciones(CuentaBancaria cuenta, String operacion, double monto) {
        realizarOperaciones(cuenta, operacion, monto, "");
    }
    
    private static void realizarOperaciones(CuentaBancaria cuenta, String operacion, 
                                         double monto, String idTransaccion) {
        System.out.println("\\n--- " + operacion.toUpperCase() + " $" + monto + " ---");
        try {
            switch (operacion.toLowerCase()) {
                case "depositar":
                    cuenta.depositar(monto);
                    break;
                case "retirar":
                    cuenta.retirar(monto, idTransaccion);
                    break;
                default:
                    throw new IllegalArgumentException("Operación no válida: " + operacion);
            }
            System.out.println("Saldo actual: $" + cuenta.getSaldo());
        } catch (MontoInvalidoException e) {
            System.out.println("Error de monto: " + e.getMessage());
        } catch (SaldoInsuficienteException e) {
            System.out.println("Error de saldo: " + e.getMessage());
        } catch (TransaccionException e) {
            System.out.println("Error de transacción: " + e.toString());
        }
    }
}`,
      explanation: "Las excepciones personalizadas te permiten manejar errores específicos de tu dominio. Puedes extender Exception (para excepciones verificadas) o RuntimeException (para no verificadas). Es bueno incluir información adicional relevante y constructores que acepten mensaje y causa. Las excepciones personalizadas hacen el código más legible y permiten un manejo de errores más específico y significativo."
    },
    {
      title: "Buenas Prácticas en Manejo de Excepciones",
      description: "Aprende las mejores prácticas para manejar excepciones eficientemente",
      code: `// Buenas prácticas en manejo de excepciones

import java.io.*;
import java.util.logging.*;

public class BuenasPracticasExcepciones {
    private static final Logger logger = Logger.getLogger(BuenasPracticasExcepciones.class.getName());
    
    // Práctica 1: Ser específico en el catch
    public static void practica1() {
        String[] numeros = {"10", "20", "abc", "30"};
        
        for (String num : numeros) {
            try {
                int valor = Integer.parseInt(num);
                System.out.println("Número válido: " + valor);
            } catch (NumberFormatException e) {
                // Específico: capturar solo la excepción esperada
                System.out.println("Error al convertir '" + num + "': no es un número válido");
                logger.warning("Error de conversión: " + num);
            }
        }
    }
    
    // Práctica 2: Usar finally para liberar recursos
    public static void practica2() {
        BufferedReader reader = null;
        try {
            reader = new BufferedReader(new FileReader("archivo.txt"));
            String linea = reader.readLine();
            System.out.println("Leído: " + linea);
        } catch (FileNotFoundException e) {
            System.out.println("Archivo no encontrado");
        } catch (IOException e) {
            System.out.println("Error al leer el archivo");
        } finally {
            // Siempre cerrar el recurso
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e) {
                    System.out.println("Error al cerrar el archivo");
                }
            }
        }
    }
    
    // Práctica 3: Try-with-resources (mejor forma)
    public static void practica3() {
        try (BufferedReader reader = new BufferedReader(new FileReader("archivo.txt"))) {
            String linea = reader.readLine();
            System.out.println("Leído: " + linea);
        } catch (FileNotFoundException e) {
            System.out.println("Archivo no encontrado");
        } catch (IOException e) {
            System.out.println("Error al leer el archivo");
        }
        // El reader se cierra automáticamente
    }
    
    // Práctica 4: No tragar excepciones (evitar catch vacío)
    public static void practica4Mala() {
        try {
            int resultado = 10 / 0;
        } catch (ArithmeticException e) {
            // MAL: No hacer nada con la excepción
        }
    }
    
    public static void practica4Buena() {
        try {
            int resultado = 10 / 0;
        } catch (ArithmeticException e) {
            // BUENO: Manejar la excepción apropiadamente
            System.out.println("Error: División por cero no permitida");
            logger.log(Level.SEVERE, "Error de división", e);
            // O relanzar si no se puede manejar aquí
            // throw new RuntimeException("Error en cálculo", e);
        }
    }
    
    // Práctica 5: Lanzar excepciones apropiadas
    public static void practica5(String nombre) {
        if (nombre == null || nombre.trim().isEmpty()) {
            // Lanzar excepción con mensaje claro
            throw new IllegalArgumentException("El nombre no puede ser nulo o vacío");
        }
        System.out.println("Hola, " + nombre);
    }
    
    // Práctica 6: Encadenar excepciones (exception chaining)
    public static void practica6() throws IOException {
        try {
            // Alguna operación que puede fallar
            procesarDatos();
        } catch (SQLException e) {
            // Encadenar la excepción original
            throw new IOException("Error al procesar los datos", e);
        }
    }
    
    private static void procesarDatos() throws SQLException {
        throw new SQLException("Error de base de datos");
    }
    
    // Práctica 7: Validar argumentos al inicio
    public static double calcularDescuento(double precio, double porcentaje) {
        // Validar argumentos al principio
        if (precio < 0) {
            throw new IllegalArgumentException("El precio no puede ser negativo");
        }
        if (porcentaje < 0 || porcentaje > 100) {
            throw new IllegalArgumentException("El porcentaje debe estar entre 0 y 100");
        }
        
        return precio * (porcentaje / 100);
    }
    
    // Práctica 8: Usar excepciones para condiciones excepcionales
    public static void practica8(int edad) {
        // MAL: usar excepciones para control de flujo normal
        if (edad >= 18) {
            System.out.println("Es mayor de edad");
        } else {
            System.out.println("Es menor de edad");
        }
        
        // BUENO: usar excepciones para condiciones realmente excepcionales
        if (edad < 0 || edad > 150) {
            throw new IllegalArgumentException("Edad no válida: " + edad);
        }
    }
    
    // Práctica 9: Documentar excepciones
    /**
     * Calcula la raíz cuadrada de un número
     * @param numero el número del cual calcular la raíz cuadrada
     * @return la raíz cuadrada del número
     * @throws IllegalArgumentException si el número es negativo
     */
    public static double calcularRaizCuadrada(double numero) {
        if (numero < 0) {
            throw new IllegalArgumentException("No se puede calcular raíz cuadrada de número negativo: " + numero);
        }
        return Math.sqrt(numero);
    }
    
    public static void main(String[] args) {
        System.out.println("=== Buenas prácticas en manejo de excepciones ===");
        
        // Demostración de prácticas
        practica1();
        
        try {
            practica5(""); // Esto lanzará excepción
        } catch (IllegalArgumentException e) {
            System.out.println("Error capturado: " + e.getMessage());
        }
        
        try {
            double descuento = calcularDescuento(-100, 10);
        } catch (IllegalArgumentException e) {
            System.out.println("Error en descuento: " + e.getMessage());
        }
        
        try {
            double raiz = calcularRaizCuadrada(-4);
        } catch (IllegalArgumentException e) {
            System.out.println("Error en raíz: " + e.getMessage());
        }
        
        // Resumen de buenas prácticas
        System.out.println("\\n=== Resumen de buenas prácticas ===");
        System.out.println("1. Ser específico en el catch");
        System.out.println("2. Usar finally o try-with-resources para liberar recursos");
        System.out.println("3. No ignorar excepciones (catch vacío)");
        System.out.println("4. Lanzar excepciones con mensajes claros");
        System.out.println("5. Encadenar excepciones para preservar la causa original");
        System.out.println("6. Validar argumentos al inicio de los métodos");
        System.out.println("7. Usar excepciones solo para condiciones excepcionales");
        System.out.println("8. Documentar las excepciones que pueden lanzar los métodos");
    }
}`,
      explanation: "Las buenas prácticas en manejo de excepciones incluyen: ser específico al capturar excepciones, usar finally o try-with-resources para liberar recursos, nunca ignorar excepciones con catch vacío, lanzar excepciones con mensajes claros, encadenar excepciones para preservar la causa original, validar argumentos al inicio, usar excepciones solo para condiciones verdaderamente excepcionales, y documentar las excepciones en los métodos con Javadoc."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Manejo de Excepciones</h1>
        <p className="text-lg text-gray-600 mb-6">
          Aprende a manejar errores y condiciones excepcionales de manera robusta.
        </p>
        
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">
                <strong>Crítico:</strong> El manejo adecuado de excepciones es esencial para 
                crear aplicaciones robustas y confiables. En Spring Boot, esto es fundamental 
                para construir APIs que manejen errores gracefully.
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
              <strong>Proyecto de aplicación:</strong> Crea un sistema de validación de formularios 
              que use excepciones personalizadas para diferentes tipos de errores de validación. 
              Implementa logging y manejo de errores a nivel global.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exceptions;
