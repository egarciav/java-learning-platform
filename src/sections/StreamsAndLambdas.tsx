import React from 'react';
import CodeExample from '../components/CodeExample';

const StreamsAndLambdas: React.FC = () => {
  const examples = [
    {
      title: "Expresiones Lambda - Fundamentos",
      description: "Sintaxis y uso básico de expresiones lambda en Java",
      code: `// EXPRESIONES LAMBDA - FUNDAMENTOS

import java.util.*;
import java.util.function.*;

public class LambdasBasicos {
    public static void main(String[] args) {
        
        // ========== SINTAXIS DE LAMBDA ==========
        
        // Sintaxis tradicional con clase anónima
        Runnable runnable1 = new Runnable() {
            @Override
            public void run() {
                System.out.println("Hola desde clase anónima");
            }
        };
        
        // Sintaxis lambda equivalente
        Runnable runnable2 = () -> System.out.println("Hola desde lambda");
        
        runnable1.run();
        runnable2.run();
        
        // ========== DIFERENTES SINTAXIS DE LAMBDA ==========
        
        // Sin parámetros
        Runnable sinParametros = () -> System.out.println("Sin parámetros");
        
        // Un parámetro (paréntesis opcionales)
        Consumer<String> unParametro1 = (s) -> System.out.println(s);
        Consumer<String> unParametro2 = s -> System.out.println(s);
        
        // Múltiples parámetros
        BiConsumer<String, Integer> dosParametros = (nombre, edad) -> {
            System.out.println("Nombre: " + nombre);
            System.out.println("Edad: " + edad);
        };
        
        // Con tipo explícito
        BiConsumer<String, Integer> conTipo = (String n, Integer e) -> 
            System.out.println(n + " tiene " + e + " años");
        
        // Con cuerpo de bloque
        Consumer<String> conBloque = s -> {
            String mayusculas = s.toUpperCase();
            System.out.println("Procesado: " + mayusculas);
        };
        
        // Con return explícito
        Function<Integer, Integer> cuadrado = x -> x * x;
        Function<Integer, Integer> cuadradoBloque = x -> {
            return x * x;
        };
        
        // ========== INTERFACES FUNCIONALES ==========
        
        // Consumer<T> - acepta un argumento, no retorna nada
        Consumer<String> imprimir = texto -> System.out.println(texto);
        imprimir.accept("Hola Consumer");
        
        // Supplier<T> - no acepta argumentos, retorna un valor
        Supplier<Double> random = () -> Math.random();
        System.out.println("Número aleatorio: " + random.get());
        
        // Function<T, R> - acepta un argumento, retorna un valor
        Function<String, Integer> longitud = s -> s.length();
        System.out.println("Longitud de 'Java': " + longitud.apply("Java"));
        
        // Predicate<T> - acepta un argumento, retorna boolean
        Predicate<Integer> esPar = n -> n % 2 == 0;
        System.out.println("4 es par: " + esPar.test(4));
        System.out.println("5 es par: " + esPar.test(5));
        
        // BiFunction<T, U, R> - acepta dos argumentos, retorna un valor
        BiFunction<Integer, Integer, Integer> suma = (a, b) -> a + b;
        System.out.println("10 + 20 = " + suma.apply(10, 20));
        
        // BiPredicate<T, U> - acepta dos argumentos, retorna boolean
        BiPredicate<String, String> sonIguales = (s1, s2) -> s1.equals(s2);
        System.out.println("'Java' == 'Java': " + sonIguales.test("Java", "Java"));
        
        // UnaryOperator<T> - acepta y retorna el mismo tipo
        UnaryOperator<Integer> duplicar = n -> n * 2;
        System.out.println("Duplicar 5: " + duplicar.apply(5));
        
        // BinaryOperator<T> - acepta dos del mismo tipo, retorna el mismo tipo
        BinaryOperator<Integer> multiplicar = (a, b) -> a * b;
        System.out.println("3 * 4 = " + multiplicar.apply(3, 4));
        
        // ========== REFERENCIAS A MÉTODOS ==========
        
        List<String> nombres = Arrays.asList("Ana", "Juan", "María", "Pedro");
        
        // Referencia a método estático
        nombres.forEach(System.out::println); // Equivale a: s -> System.out.println(s)
        
        // Referencia a método de instancia
        String prefijo = "Sr. ";
        Function<String, String> agregarPrefijo = prefijo::concat;
        System.out.println(agregarPrefijo.apply("Juan"));
        
        // Referencia a método de instancia de un tipo arbitrario
        Function<String, String> aMayusculas = String::toUpperCase;
        System.out.println(aMayusculas.apply("java"));
        
        // Referencia a constructor
        Supplier<ArrayList<String>> crearLista = ArrayList::new;
        ArrayList<String> nuevaLista = crearLista.get();
        
        Function<Integer, ArrayList<String>> crearListaConCapacidad = ArrayList::new;
        ArrayList<String> listaConCapacidad = crearListaConCapacidad.apply(10);
        
        // ========== COMPOSICIÓN DE FUNCIONES ==========
        
        Function<Integer, Integer> multiplicarPor2 = x -> x * 2;
        Function<Integer, Integer> sumar10 = x -> x + 10;
        
        // andThen: aplica primero la función actual, luego la siguiente
        Function<Integer, Integer> multiplicarLuegoSumar = 
            multiplicarPor2.andThen(sumar10);
        System.out.println("\\n(5 * 2) + 10 = " + multiplicarLuegoSumar.apply(5)); // 20
        
        // compose: aplica primero la función parámetro, luego la actual
        Function<Integer, Integer> sumarLuegoMultiplicar = 
            multiplicarPor2.compose(sumar10);
        System.out.println("(5 + 10) * 2 = " + sumarLuegoMultiplicar.apply(5)); // 30
        
        // Composición de Predicates
        Predicate<Integer> mayorQue5 = n -> n > 5;
        Predicate<Integer> menorQue20 = n -> n < 20;
        
        Predicate<Integer> entre5y20 = mayorQue5.and(menorQue20);
        System.out.println("\\n10 está entre 5 y 20: " + entre5y20.test(10));
        System.out.println("25 está entre 5 y 20: " + entre5y20.test(25));
        
        Predicate<Integer> fueraDeRango = mayorQue5.or(menorQue20).negate();
        
        // ========== LAMBDAS CON VARIABLES LOCALES ==========
        
        int factor = 10; // Debe ser efectivamente final
        Function<Integer, Integer> multiplicarPorFactor = n -> n * factor;
        System.out.println("\\n5 * 10 = " + multiplicarPorFactor.apply(5));
        
        // factor = 20; // ERROR: no puede modificarse después de usarse en lambda
        
        // ========== INTERFAZ FUNCIONAL PERSONALIZADA ==========
        
        // Definir interfaz funcional
        @FunctionalInterface
        interface Operacion {
            int calcular(int a, int b);
            
            // Puede tener métodos default
            default void mostrarResultado(int a, int b) {
                System.out.println("Resultado: " + calcular(a, b));
            }
        }
        
        Operacion suma2 = (a, b) -> a + b;
        Operacion resta = (a, b) -> a - b;
        Operacion multiplicacion = (a, b) -> a * b;
        
        System.out.println("\\nOperaciones personalizadas:");
        suma2.mostrarResultado(10, 5);
        resta.mostrarResultado(10, 5);
        multiplicacion.mostrarResultado(10, 5);
    }
}`,
      explanation: "Las expresiones lambda son funciones anónimas introducidas en Java 8. Sintaxis: (parámetros) -> expresión o (parámetros) -> { bloque }. Requieren interfaces funcionales (una sola método abstracto). Java proporciona interfaces funcionales comunes: Consumer (acepta, no retorna), Supplier (no acepta, retorna), Function (acepta, retorna), Predicate (acepta, retorna boolean), BiFunction, UnaryOperator, BinaryOperator. Las referencias a métodos (::) son atajos para lambdas. Las funciones pueden componerse con andThen y compose. Las variables capturadas deben ser efectivamente finales."
    },
    {
      title: "Streams API - Operaciones Básicas",
      description: "Procesamiento de colecciones con Streams",
      code: `// STREAMS API - OPERACIONES BÁSICAS

import java.util.*;
import java.util.stream.*;

public class StreamsBasicos {
    public static void main(String[] args) {
        
        // ========== CREACIÓN DE STREAMS ==========
        
        // Desde una colección
        List<String> lista = Arrays.asList("Java", "Python", "JavaScript", "C++");
        Stream<String> stream1 = lista.stream();
        
        // Desde un array
        String[] array = {"A", "B", "C"};
        Stream<String> stream2 = Arrays.stream(array);
        
        // Con Stream.of()
        Stream<Integer> stream3 = Stream.of(1, 2, 3, 4, 5);
        
        // Stream vacío
        Stream<String> streamVacio = Stream.empty();
        
        // Stream infinito con iterate
        Stream<Integer> infinito1 = Stream.iterate(0, n -> n + 2); // 0, 2, 4, 6...
        
        // Stream infinito con generate
        Stream<Double> infinito2 = Stream.generate(Math::random);
        
        // Stream de rango (IntStream)
        IntStream rango1 = IntStream.range(1, 5);        // 1, 2, 3, 4
        IntStream rango2 = IntStream.rangeClosed(1, 5);  // 1, 2, 3, 4, 5
        
        // ========== OPERACIONES INTERMEDIAS ==========
        
        List<Integer> numeros = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        
        // filter - filtra elementos según condición
        System.out.println("=== FILTER ===");
        numeros.stream()
               .filter(n -> n % 2 == 0)
               .forEach(n -> System.out.print(n + " ")); // 2 4 6 8 10
        
        // map - transforma cada elemento
        System.out.println("\\n\\n=== MAP ===");
        numeros.stream()
               .map(n -> n * n)
               .forEach(n -> System.out.print(n + " ")); // 1 4 9 16 25...
        
        // flatMap - aplana streams anidados
        System.out.println("\\n\\n=== FLATMAP ===");
        List<List<Integer>> listas = Arrays.asList(
            Arrays.asList(1, 2),
            Arrays.asList(3, 4),
            Arrays.asList(5, 6)
        );
        listas.stream()
              .flatMap(List::stream)
              .forEach(n -> System.out.print(n + " ")); // 1 2 3 4 5 6
        
        // distinct - elimina duplicados
        System.out.println("\\n\\n=== DISTINCT ===");
        Arrays.asList(1, 2, 2, 3, 3, 3, 4, 5, 5)
              .stream()
              .distinct()
              .forEach(n -> System.out.print(n + " ")); // 1 2 3 4 5
        
        // sorted - ordena elementos
        System.out.println("\\n\\n=== SORTED ===");
        Arrays.asList(5, 2, 8, 1, 9, 3)
              .stream()
              .sorted()
              .forEach(n -> System.out.print(n + " ")); // 1 2 3 5 8 9
        
        // sorted con comparador
        System.out.println("\\n\\n=== SORTED (descendente) ===");
        Arrays.asList(5, 2, 8, 1, 9, 3)
              .stream()
              .sorted(Comparator.reverseOrder())
              .forEach(n -> System.out.print(n + " ")); // 9 8 5 3 2 1
        
        // peek - ejecuta acción sin modificar stream (para debugging)
        System.out.println("\\n\\n=== PEEK ===");
        numeros.stream()
               .filter(n -> n % 2 == 0)
               .peek(n -> System.out.println("Filtrado: " + n))
               .map(n -> n * n)
               .peek(n -> System.out.println("Mapeado: " + n))
               .limit(3)
               .forEach(n -> System.out.println("Final: " + n));
        
        // limit - limita cantidad de elementos
        System.out.println("\\n=== LIMIT ===");
        Stream.iterate(1, n -> n + 1)
              .limit(5)
              .forEach(n -> System.out.print(n + " ")); // 1 2 3 4 5
        
        // skip - salta elementos
        System.out.println("\\n\\n=== SKIP ===");
        numeros.stream()
               .skip(5)
               .forEach(n -> System.out.print(n + " ")); // 6 7 8 9 10
        
        // ========== OPERACIONES TERMINALES ==========
        
        // forEach - ejecuta acción para cada elemento
        System.out.println("\\n\\n=== FOREACH ===");
        numeros.stream().forEach(n -> System.out.print(n + " "));
        
        // count - cuenta elementos
        System.out.println("\\n\\n=== COUNT ===");
        long cantidad = numeros.stream()
                               .filter(n -> n > 5)
                               .count();
        System.out.println("Números mayores que 5: " + cantidad);
        
        // collect - recolecta elementos en colección
        System.out.println("\\n=== COLLECT ===");
        List<Integer> pares = numeros.stream()
                                     .filter(n -> n % 2 == 0)
                                     .collect(Collectors.toList());
        System.out.println("Números pares: " + pares);
        
        Set<Integer> conjunto = numeros.stream()
                                       .collect(Collectors.toSet());
        System.out.println("Como Set: " + conjunto);
        
        // toArray - convierte a array
        Integer[] arrayNumeros = numeros.stream()
                                        .toArray(Integer[]::new);
        System.out.println("Como array: " + Arrays.toString(arrayNumeros));
        
        // reduce - reduce a un solo valor
        System.out.println("\\n=== REDUCE ===");
        int suma = numeros.stream()
                          .reduce(0, (a, b) -> a + b);
        System.out.println("Suma: " + suma);
        
        int producto = numeros.stream()
                              .reduce(1, (a, b) -> a * b);
        System.out.println("Producto: " + producto);
        
        Optional<Integer> max = numeros.stream()
                                       .reduce((a, b) -> a > b ? a : b);
        max.ifPresent(m -> System.out.println("Máximo: " + m));
        
        // min y max
        System.out.println("\\n=== MIN/MAX ===");
        Optional<Integer> minimo = numeros.stream().min(Integer::compareTo);
        Optional<Integer> maximo = numeros.stream().max(Integer::compareTo);
        
        minimo.ifPresent(m -> System.out.println("Mínimo: " + m));
        maximo.ifPresent(m -> System.out.println("Máximo: " + m));
        
        // anyMatch, allMatch, noneMatch
        System.out.println("\\n=== MATCH ===");
        boolean hayPares = numeros.stream().anyMatch(n -> n % 2 == 0);
        boolean todosPares = numeros.stream().allMatch(n -> n % 2 == 0);
        boolean ningunNegativo = numeros.stream().noneMatch(n -> n < 0);
        
        System.out.println("Hay números pares: " + hayPares);
        System.out.println("Todos son pares: " + todosPares);
        System.out.println("Ninguno es negativo: " + ningunNegativo);
        
        // findFirst y findAny
        System.out.println("\\n=== FIND ===");
        Optional<Integer> primero = numeros.stream()
                                           .filter(n -> n > 5)
                                           .findFirst();
        primero.ifPresent(p -> System.out.println("Primer número > 5: " + p));
        
        Optional<Integer> cualquiera = numeros.stream()
                                              .filter(n -> n > 5)
                                              .findAny();
        cualquiera.ifPresent(c -> System.out.println("Cualquier número > 5: " + c));
    }
}`,
      explanation: "Los Streams permiten procesamiento funcional de colecciones. Se crean desde colecciones, arrays, o con Stream.of(). Las operaciones intermedias (filter, map, flatMap, distinct, sorted, peek, limit, skip) son lazy y retornan un nuevo Stream. Las operaciones terminales (forEach, count, collect, reduce, min, max, anyMatch, allMatch, noneMatch, findFirst, findAny) ejecutan el pipeline y producen un resultado. Los Streams son de un solo uso. filter filtra por condición, map transforma elementos, flatMap aplana streams anidados, reduce combina elementos en uno solo, collect recolecta en colecciones."
    },
    {
      title: "Streams API - Operaciones Avanzadas",
      description: "Collectors, grouping, partitioning y operaciones complejas",
      code: `// STREAMS API - OPERACIONES AVANZADAS

import java.util.*;
import java.util.stream.*;

public class StreamsAvanzados {
    
    static class Persona {
        String nombre;
        int edad;
        String ciudad;
        double salario;
        
        public Persona(String nombre, int edad, String ciudad, double salario) {
            this.nombre = nombre;
            this.edad = edad;
            this.ciudad = ciudad;
            this.salario = salario;
        }
        
        public String getNombre() { return nombre; }
        public int getEdad() { return edad; }
        public String getCiudad() { return ciudad; }
        public double getSalario() { return salario; }
        
        @Override
        public String toString() {
            return nombre + " (" + edad + " años, " + ciudad + ", $" + salario + ")";
        }
    }
    
    public static void main(String[] args) {
        
        List<Persona> personas = Arrays.asList(
            new Persona("Ana", 25, "Madrid", 30000),
            new Persona("Juan", 30, "Barcelona", 45000),
            new Persona("María", 28, "Madrid", 35000),
            new Persona("Pedro", 35, "Valencia", 50000),
            new Persona("Lucía", 22, "Barcelona", 28000),
            new Persona("Carlos", 40, "Madrid", 55000),
            new Persona("Elena", 27, "Valencia", 32000)
        );
        
        // ========== COLLECTORS BÁSICOS ==========
        
        // toList, toSet
        List<String> nombres = personas.stream()
                                       .map(Persona::getNombre)
                                       .collect(Collectors.toList());
        System.out.println("Nombres: " + nombres);
        
        Set<String> ciudades = personas.stream()
                                       .map(Persona::getCiudad)
                                       .collect(Collectors.toSet());
        System.out.println("Ciudades únicas: " + ciudades);
        
        // toMap
        Map<String, Integer> nombreEdad = personas.stream()
            .collect(Collectors.toMap(
                Persona::getNombre,
                Persona::getEdad
            ));
        System.out.println("\\nMapa nombre-edad: " + nombreEdad);
        
        // joining - concatena strings
        String todosNombres = personas.stream()
                                      .map(Persona::getNombre)
                                      .collect(Collectors.joining(", "));
        System.out.println("\\nTodos los nombres: " + todosNombres);
        
        String nombresConPrefijo = personas.stream()
                                           .map(Persona::getNombre)
                                           .collect(Collectors.joining(", ", "[", "]"));
        System.out.println("Con prefijo/sufijo: " + nombresConPrefijo);
        
        // ========== ESTADÍSTICAS ==========
        
        // counting
        long cantidad = personas.stream()
                                .collect(Collectors.counting());
        System.out.println("\\nCantidad de personas: " + cantidad);
        
        // summingInt, summingDouble
        int sumaEdades = personas.stream()
                                 .collect(Collectors.summingInt(Persona::getEdad));
        System.out.println("Suma de edades: " + sumaEdades);
        
        double sumaSalarios = personas.stream()
                                      .collect(Collectors.summingDouble(Persona::getSalario));
        System.out.println("Suma de salarios: $" + sumaSalarios);
        
        // averagingInt, averagingDouble
        double promedioEdad = personas.stream()
                                      .collect(Collectors.averagingInt(Persona::getEdad));
        System.out.println("Promedio de edad: " + promedioEdad);
        
        double promedioSalario = personas.stream()
                                         .collect(Collectors.averagingDouble(Persona::getSalario));
        System.out.println("Promedio de salario: $" + promedioSalario);
        
        // summarizingInt, summarizingDouble - todas las estadísticas
        IntSummaryStatistics statsEdad = personas.stream()
            .collect(Collectors.summarizingInt(Persona::getEdad));
        
        System.out.println("\\nEstadísticas de edad:");
        System.out.println("  Cantidad: " + statsEdad.getCount());
        System.out.println("  Suma: " + statsEdad.getSum());
        System.out.println("  Promedio: " + statsEdad.getAverage());
        System.out.println("  Mínimo: " + statsEdad.getMin());
        System.out.println("  Máximo: " + statsEdad.getMax());
        
        // maxBy, minBy
        Optional<Persona> mayorEdad = personas.stream()
            .collect(Collectors.maxBy(Comparator.comparingInt(Persona::getEdad)));
        mayorEdad.ifPresent(p -> System.out.println("\\nMayor edad: " + p));
        
        Optional<Persona> menorSalario = personas.stream()
            .collect(Collectors.minBy(Comparator.comparingDouble(Persona::getSalario)));
        menorSalario.ifPresent(p -> System.out.println("Menor salario: " + p));
        
        // ========== GROUPING (AGRUPACIÓN) ==========
        
        // groupingBy - agrupar por criterio
        Map<String, List<Persona>> porCiudad = personas.stream()
            .collect(Collectors.groupingBy(Persona::getCiudad));
        
        System.out.println("\\n=== AGRUPACIÓN POR CIUDAD ===");
        porCiudad.forEach((ciudad, lista) -> {
            System.out.println(ciudad + ": " + lista.size() + " personas");
            lista.forEach(p -> System.out.println("  - " + p));
        });
        
        // groupingBy con conteo
        Map<String, Long> contadoPorCiudad = personas.stream()
            .collect(Collectors.groupingBy(
                Persona::getCiudad,
                Collectors.counting()
            ));
        System.out.println("\\nConteo por ciudad: " + contadoPorCiudad);
        
        // groupingBy con suma
        Map<String, Double> salariosPorCiudad = personas.stream()
            .collect(Collectors.groupingBy(
                Persona::getCiudad,
                Collectors.summingDouble(Persona::getSalario)
            ));
        System.out.println("Salarios totales por ciudad: " + salariosPorCiudad);
        
        // groupingBy con promedio
        Map<String, Double> promedioEdadPorCiudad = personas.stream()
            .collect(Collectors.groupingBy(
                Persona::getCiudad,
                Collectors.averagingInt(Persona::getEdad)
            ));
        System.out.println("Promedio de edad por ciudad: " + promedioEdadPorCiudad);
        
        // groupingBy anidado (multi-nivel)
        Map<String, Map<String, List<Persona>>> porCiudadYRangoEdad = personas.stream()
            .collect(Collectors.groupingBy(
                Persona::getCiudad,
                Collectors.groupingBy(p -> p.getEdad() < 30 ? "Joven" : "Adulto")
            ));
        
        System.out.println("\\n=== AGRUPACIÓN MULTI-NIVEL ===");
        porCiudadYRangoEdad.forEach((ciudad, grupos) -> {
            System.out.println(ciudad + ":");
            grupos.forEach((rango, lista) -> {
                System.out.println("  " + rango + ": " + lista.size());
            });
        });
        
        // ========== PARTITIONING (PARTICIONADO) ==========
        
        // partitioningBy - divide en dos grupos (true/false)
        Map<Boolean, List<Persona>> mayoresDe30 = personas.stream()
            .collect(Collectors.partitioningBy(p -> p.getEdad() > 30));
        
        System.out.println("\\n=== PARTICIONADO POR EDAD > 30 ===");
        System.out.println("Mayores de 30: " + mayoresDe30.get(true).size());
        System.out.println("30 o menos: " + mayoresDe30.get(false).size());
        
        // partitioningBy con downstream collector
        Map<Boolean, Long> conteoMayoresDe30 = personas.stream()
            .collect(Collectors.partitioningBy(
                p -> p.getEdad() > 30,
                Collectors.counting()
            ));
        System.out.println("Conteo: " + conteoMayoresDe30);
        
        // ========== OPERACIONES PARALELAS ==========
        
        System.out.println("\\n=== STREAMS PARALELOS ===");
        
        // Stream paralelo
        long inicio = System.currentTimeMillis();
        long suma = IntStream.rangeClosed(1, 1000000)
                             .parallel()
                             .sum();
        long fin = System.currentTimeMillis();
        
        System.out.println("Suma paralela: " + suma);
        System.out.println("Tiempo: " + (fin - inicio) + "ms");
        
        // Comparar con secuencial
        inicio = System.currentTimeMillis();
        suma = IntStream.rangeClosed(1, 1000000)
                        .sum();
        fin = System.currentTimeMillis();
        
        System.out.println("Suma secuencial: " + suma);
        System.out.println("Tiempo: " + (fin - inicio) + "ms");
        
        // ========== FLAT MAP AVANZADO ==========
        
        System.out.println("\\n=== FLATMAP AVANZADO ===");
        
        List<String> frases = Arrays.asList(
            "Hola mundo",
            "Java streams",
            "Programación funcional"
        );
        
        // Obtener todas las palabras únicas
        List<String> palabras = frases.stream()
            .flatMap(frase -> Arrays.stream(frase.split(" ")))
            .distinct()
            .collect(Collectors.toList());
        
        System.out.println("Palabras únicas: " + palabras);
        
        // ========== OPERACIONES COMPLEJAS COMBINADAS ==========
        
        System.out.println("\\n=== OPERACIÓN COMPLEJA ===");
        
        // Encontrar las 3 personas con mayor salario de Madrid
        List<Persona> top3Madrid = personas.stream()
            .filter(p -> p.getCiudad().equals("Madrid"))
            .sorted(Comparator.comparingDouble(Persona::getSalario).reversed())
            .limit(3)
            .collect(Collectors.toList());
        
        System.out.println("Top 3 salarios en Madrid:");
        top3Madrid.forEach(System.out::println);
        
        // Promedio de salario de personas menores de 30 años
        OptionalDouble promedioJovenes = personas.stream()
            .filter(p -> p.getEdad() < 30)
            .mapToDouble(Persona::getSalario)
            .average();
        
        promedioJovenes.ifPresent(p -> 
            System.out.println("\\nPromedio salario < 30 años: $" + p));
    }
}`,
      explanation: "Los Collectors avanzados permiten operaciones complejas: groupingBy agrupa elementos por criterio (puede ser multi-nivel), partitioningBy divide en dos grupos (true/false), joining concatena strings, summarizing calcula estadísticas completas. Los downstream collectors permiten operaciones adicionales después de agrupar (counting, summing, averaging). Los streams paralelos (.parallel()) procesan elementos concurrentemente para mejor rendimiento en grandes volúmenes. flatMap es útil para aplanar estructuras anidadas. Se pueden combinar múltiples operaciones para análisis complejos de datos."
    },
    {
      title: "Optional - Manejo de Valores Nulos",
      description: "Evita NullPointerException con Optional",
      code: `// OPTIONAL - MANEJO DE VALORES NULOS

import java.util.*;

public class OptionalDemo {
    
    static class Usuario {
        private String nombre;
        private String email;
        private String telefono; // Puede ser null
        
        public Usuario(String nombre, String email, String telefono) {
            this.nombre = nombre;
            this.email = email;
            this.telefono = telefono;
        }
        
        public String getNombre() { return nombre; }
        public String getEmail() { return email; }
        public Optional<String> getTelefono() { 
            return Optional.ofNullable(telefono); 
        }
    }
    
    public static void main(String[] args) {
        
        // ========== CREACIÓN DE OPTIONAL ==========
        
        // Optional con valor
        Optional<String> conValor = Optional.of("Hola");
        System.out.println("Con valor: " + conValor);
        
        // Optional vacío
        Optional<String> vacio = Optional.empty();
        System.out.println("Vacío: " + vacio);
        
        // Optional que puede ser null
        String texto = null;
        Optional<String> nullable = Optional.ofNullable(texto);
        System.out.println("Nullable: " + nullable);
        
        String texto2 = "Java";
        Optional<String> nullable2 = Optional.ofNullable(texto2);
        System.out.println("Nullable con valor: " + nullable2);
        
        // Optional.of() con null lanza NullPointerException
        try {
            Optional<String> error = Optional.of(null);
        } catch (NullPointerException e) {
            System.out.println("\\nOptional.of(null) lanza excepción");
        }
        
        // ========== VERIFICAR SI TIENE VALOR ==========
        
        Optional<String> opt1 = Optional.of("Valor");
        Optional<String> opt2 = Optional.empty();
        
        System.out.println("\\n=== VERIFICACIÓN ===");
        System.out.println("opt1.isPresent(): " + opt1.isPresent());
        System.out.println("opt2.isPresent(): " + opt2.isPresent());
        System.out.println("opt1.isEmpty(): " + opt1.isEmpty());
        System.out.println("opt2.isEmpty(): " + opt2.isEmpty());
        
        // ========== OBTENER VALOR ==========
        
        System.out.println("\\n=== OBTENER VALOR ===");
        
        // get() - lanza excepción si está vacío
        String valor1 = opt1.get();
        System.out.println("opt1.get(): " + valor1);
        
        try {
            String valor2 = opt2.get(); // NoSuchElementException
        } catch (NoSuchElementException e) {
            System.out.println("opt2.get() lanza excepción");
        }
        
        // orElse() - valor por defecto
        String valor3 = opt2.orElse("Valor por defecto");
        System.out.println("opt2.orElse(): " + valor3);
        
        // orElseGet() - valor por defecto con Supplier
        String valor4 = opt2.orElseGet(() -> "Generado dinámicamente");
        System.out.println("opt2.orElseGet(): " + valor4);
        
        // orElseThrow() - lanza excepción personalizada
        try {
            String valor5 = opt2.orElseThrow(() -> 
                new IllegalStateException("Optional vacío"));
        } catch (IllegalStateException e) {
            System.out.println("opt2.orElseThrow(): " + e.getMessage());
        }
        
        // ========== OPERACIONES CONDICIONALES ==========
        
        System.out.println("\\n=== OPERACIONES CONDICIONALES ===");
        
        // ifPresent() - ejecuta acción si tiene valor
        opt1.ifPresent(v -> System.out.println("Valor presente: " + v));
        opt2.ifPresent(v -> System.out.println("Esto no se imprime"));
        
        // ifPresentOrElse() - ejecuta una acción u otra
        opt1.ifPresentOrElse(
            v -> System.out.println("Tiene valor: " + v),
            () -> System.out.println("Está vacío")
        );
        
        opt2.ifPresentOrElse(
            v -> System.out.println("Tiene valor: " + v),
            () -> System.out.println("Está vacío")
        );
        
        // ========== TRANSFORMACIONES ==========
        
        System.out.println("\\n=== TRANSFORMACIONES ===");
        
        Optional<String> nombre = Optional.of("juan");
        
        // map() - transforma el valor
        Optional<String> nombreMayusculas = nombre.map(String::toUpperCase);
        System.out.println("map(toUpperCase): " + nombreMayusculas.get());
        
        Optional<Integer> longitud = nombre.map(String::length);
        System.out.println("map(length): " + longitud.get());
        
        // map() con Optional vacío
        Optional<String> vacio2 = Optional.empty();
        Optional<String> resultado = vacio2.map(String::toUpperCase);
        System.out.println("map sobre vacío: " + resultado);
        
        // flatMap() - para Optional anidados
        Optional<Optional<String>> anidado = Optional.of(Optional.of("Anidado"));
        
        // Con map() obtenemos Optional<Optional<String>>
        Optional<Optional<String>> conMap = Optional.of("texto")
            .map(t -> Optional.of(t.toUpperCase()));
        
        // Con flatMap() obtenemos Optional<String>
        Optional<String> conFlatMap = Optional.of("texto")
            .flatMap(t -> Optional.of(t.toUpperCase()));
        
        System.out.println("flatMap: " + conFlatMap.get());
        
        // ========== FILTRADO ==========
        
        System.out.println("\\n=== FILTRADO ===");
        
        Optional<Integer> numero = Optional.of(42);
        
        // filter() - filtra según condición
        Optional<Integer> par = numero.filter(n -> n % 2 == 0);
        System.out.println("42 es par: " + par.isPresent());
        
        Optional<Integer> mayor100 = numero.filter(n -> n > 100);
        System.out.println("42 > 100: " + mayor100.isPresent());
        
        // ========== ENCADENAMIENTO ==========
        
        System.out.println("\\n=== ENCADENAMIENTO ===");
        
        Optional<String> resultado2 = Optional.of("  java  ")
            .map(String::trim)
            .map(String::toUpperCase)
            .filter(s -> s.length() > 3);
        
        resultado2.ifPresent(r -> System.out.println("Resultado: " + r));
        
        // ========== USO CON STREAMS ==========
        
        System.out.println("\\n=== OPTIONAL CON STREAMS ===");
        
        List<Optional<String>> listaOptionals = Arrays.asList(
            Optional.of("Ana"),
            Optional.empty(),
            Optional.of("Juan"),
            Optional.empty(),
            Optional.of("María")
        );
        
        // Filtrar valores presentes
        List<String> valores = listaOptionals.stream()
            .filter(Optional::isPresent)
            .map(Optional::get)
            .collect(java.util.stream.Collectors.toList());
        
        System.out.println("Valores presentes: " + valores);
        
        // Con flatMap (Java 9+)
        List<String> valores2 = listaOptionals.stream()
            .flatMap(Optional::stream)
            .collect(java.util.stream.Collectors.toList());
        
        System.out.println("Con flatMap: " + valores2);
        
        // ========== EJEMPLO PRÁCTICO ==========
        
        System.out.println("\\n=== EJEMPLO PRÁCTICO ===");
        
        Usuario usuario1 = new Usuario("Ana", "ana@email.com", "123456789");
        Usuario usuario2 = new Usuario("Juan", "juan@email.com", null);
        
        // Forma tradicional (propensa a NullPointerException)
        /*
        String telefono1 = usuario1.getTelefono();
        if (telefono1 != null) {
            System.out.println("Teléfono: " + telefono1);
        }
        */
        
        // Con Optional
        usuario1.getTelefono()
                .ifPresent(tel -> System.out.println("Teléfono de Ana: " + tel));
        
        usuario2.getTelefono()
                .ifPresent(tel -> System.out.println("Teléfono de Juan: " + tel));
        
        // Con valor por defecto
        String telefono2 = usuario2.getTelefono()
                                   .orElse("Sin teléfono");
        System.out.println("Teléfono de Juan: " + telefono2);
        
        // Transformación y valor por defecto
        String telefonoFormateado = usuario1.getTelefono()
            .map(tel -> "+" + tel)
            .orElse("No disponible");
        System.out.println("Teléfono formateado: " + telefonoFormateado);
        
        // ========== OR (Java 9+) ==========
        
        System.out.println("\\n=== OR (alternativa) ===");
        
        Optional<String> primero = Optional.empty();
        Optional<String> segundo = Optional.of("Segundo");
        
        // or() - proporciona Optional alternativo
        Optional<String> resultado3 = primero.or(() -> segundo);
        System.out.println("Resultado or(): " + resultado3.get());
    }
}`,
      explanation: "Optional es un contenedor que puede o no contener un valor no-nulo, diseñado para evitar NullPointerException. Se crea con Optional.of() (valor no-null), Optional.empty() (vacío), u Optional.ofNullable() (puede ser null). Métodos de verificación: isPresent(), isEmpty(). Métodos para obtener valor: get() (lanza excepción si vacío), orElse() (valor por defecto), orElseGet() (Supplier), orElseThrow() (excepción personalizada). Transformaciones: map() (transforma valor), flatMap() (para Optional anidados), filter() (filtra por condición). Operaciones condicionales: ifPresent(), ifPresentOrElse(). Optional NO debe usarse como parámetro de método ni como atributo de clase."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Streams y Expresiones Lambda</h1>
        <p className="text-lg text-gray-600 mb-6">
          Programación funcional en Java: lambdas, streams, y procesamiento de datos moderno.
        </p>
        
        <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-purple-700">
                <strong>Java 8+:</strong> Las expresiones lambda y Streams API revolucionaron Java,
                permitiendo programación funcional, código más conciso, y procesamiento eficiente
                de colecciones. Son fundamentales en el desarrollo moderno de Java.
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

      <div className="mt-8 bg-blue-50 border-l-4 border-blue-400 p-4">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              <strong>Práctica recomendada:</strong> Los Streams son ideales para procesamiento
              de colecciones, pero no reemplazan loops tradicionales en todos los casos. Usa
              Streams cuando mejoren la legibilidad y expresividad del código. Para operaciones
              simples, un for loop puede ser más claro.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamsAndLambdas;
