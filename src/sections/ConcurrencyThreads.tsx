import React from 'react';
import CodeExample from '../components/CodeExample';

const ConcurrencyThreads: React.FC = () => {
  const examples = [
    {
      title: "Threads Básicos - Creación y Ejecución",
      description: "Cómo crear y ejecutar threads en Java",
      code: `// THREADS BÁSICOS - CREACIÓN Y EJECUCIÓN

public class ThreadsBasicos {
    
    // ========== MÉTODO 1: EXTENDER Thread ==========
    static class MiThread extends Thread {
        private String nombre;
        
        public MiThread(String nombre) {
            this.nombre = nombre;
        }
        
        @Override
        public void run() {
            for (int i = 1; i <= 5; i++) {
                System.out.println(nombre + " - Iteración " + i);
                try {
                    Thread.sleep(500); // Pausa de 500ms
                } catch (InterruptedException e) {
                    System.out.println(nombre + " interrumpido");
                }
            }
            System.out.println(nombre + " terminado");
        }
    }
    
    // ========== MÉTODO 2: IMPLEMENTAR Runnable ==========
    static class MiRunnable implements Runnable {
        private String nombre;
        
        public MiRunnable(String nombre) {
            this.nombre = nombre;
        }
        
        @Override
        public void run() {
            for (int i = 1; i <= 5; i++) {
                System.out.println(nombre + " - Iteración " + i);
                try {
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    System.out.println(nombre + " interrumpido");
                }
            }
            System.out.println(nombre + " terminado");
        }
    }
    
    public static void main(String[] args) {
        
        System.out.println("=== CREACIÓN DE THREADS ===");
        
        // Método 1: Extender Thread
        MiThread thread1 = new MiThread("Thread-1");
        thread1.start(); // Inicia el thread (llama a run() en nuevo thread)
        
        // Método 2: Implementar Runnable
        MiRunnable runnable = new MiRunnable("Thread-2");
        Thread thread2 = new Thread(runnable);
        thread2.start();
        
        // Método 3: Con expresión lambda (Java 8+)
        Thread thread3 = new Thread(() -> {
            for (int i = 1; i <= 5; i++) {
                System.out.println("Thread-3 - Iteración " + i);
                try {
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    System.out.println("Thread-3 interrumpido");
                }
            }
            System.out.println("Thread-3 terminado");
        });
        thread3.start();
        
        // ========== INFORMACIÓN DEL THREAD ==========
        
        System.out.println("\\n=== INFORMACIÓN DE THREADS ===");
        System.out.println("Thread actual: " + Thread.currentThread().getName());
        System.out.println("ID: " + Thread.currentThread().getId());
        System.out.println("Prioridad: " + Thread.currentThread().getPriority());
        System.out.println("Estado: " + Thread.currentThread().getState());
        System.out.println("Es daemon: " + Thread.currentThread().isDaemon());
        System.out.println("Está vivo: " + Thread.currentThread().isAlive());
        
        // ========== PRIORIDADES ==========
        
        Thread threadAltaPrioridad = new Thread(() -> {
            System.out.println("Thread alta prioridad ejecutándose");
        });
        threadAltaPrioridad.setPriority(Thread.MAX_PRIORITY); // 10
        
        Thread threadBajaPrioridad = new Thread(() -> {
            System.out.println("Thread baja prioridad ejecutándose");
        });
        threadBajaPrioridad.setPriority(Thread.MIN_PRIORITY); // 1
        
        threadAltaPrioridad.start();
        threadBajaPrioridad.start();
        
        // ========== DAEMON THREADS ==========
        
        Thread daemonThread = new Thread(() -> {
            while (true) {
                System.out.println("Daemon thread ejecutándose...");
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    break;
                }
            }
        });
        daemonThread.setDaemon(true); // Debe establecerse antes de start()
        daemonThread.start();
        
        // ========== JOIN - ESPERAR A QUE TERMINE ==========
        
        System.out.println("\\n=== JOIN ===");
        
        Thread threadConJoin = new Thread(() -> {
            System.out.println("Thread iniciado");
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("Thread terminado");
        });
        
        threadConJoin.start();
        
        try {
            System.out.println("Esperando a que termine el thread...");
            threadConJoin.join(); // Espera a que termine
            System.out.println("Thread ha terminado, continuando...");
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        // ========== INTERRUMPIR THREADS ==========
        
        System.out.println("\\n=== INTERRUMPIR THREADS ===");
        
        Thread threadInterrumpible = new Thread(() -> {
            try {
                for (int i = 1; i <= 10; i++) {
                    System.out.println("Trabajando... " + i);
                    Thread.sleep(500);
                    
                    // Verificar si fue interrumpido
                    if (Thread.interrupted()) {
                        System.out.println("Thread interrumpido, limpiando...");
                        return;
                    }
                }
            } catch (InterruptedException e) {
                System.out.println("Interrumpido durante sleep");
            }
        });
        
        threadInterrumpible.start();
        
        try {
            Thread.sleep(2000);
            threadInterrumpible.interrupt(); // Interrumpe el thread
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        System.out.println("\\nPrograma principal terminando...");
    }
}`,
      explanation: "Los threads permiten ejecución concurrente. Se crean extendiendo Thread o implementando Runnable (preferido). start() inicia el thread en paralelo, run() ejecuta en el mismo thread. Thread.sleep() pausa el thread. join() espera a que un thread termine. interrupt() solicita interrupción. Los daemon threads terminan cuando todos los threads no-daemon terminan. Las prioridades (1-10) sugieren al scheduler qué threads ejecutar primero. Thread.currentThread() obtiene el thread actual. Los threads pueden estar en estados: NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, TERMINATED."
    },
    {
      title: "Sincronización y Problemas de Concurrencia",
      description: "Evita race conditions con sincronización",
      code: `// SINCRONIZACIÓN Y PROBLEMAS DE CONCURRENCIA

public class Sincronizacion {
    
    // ========== PROBLEMA: RACE CONDITION ==========
    static class ContadorSinSincronizar {
        private int cuenta = 0;
        
        public void incrementar() {
            cuenta++; // NO es atómico: lee, incrementa, escribe
        }
        
        public int getCuenta() {
            return cuenta;
        }
    }
    
    // ========== SOLUCIÓN 1: MÉTODO SINCRONIZADO ==========
    static class ContadorSincronizado {
        private int cuenta = 0;
        
        public synchronized void incrementar() {
            cuenta++;
        }
        
        public synchronized int getCuenta() {
            return cuenta;
        }
    }
    
    // ========== SOLUCIÓN 2: BLOQUE SINCRONIZADO ==========
    static class ContadorConBloque {
        private int cuenta = 0;
        private final Object lock = new Object();
        
        public void incrementar() {
            synchronized (lock) {
                cuenta++;
            }
        }
        
        public int getCuenta() {
            synchronized (lock) {
                return cuenta;
            }
        }
    }
    
    // ========== EJEMPLO: CUENTA BANCARIA ==========
    static class CuentaBancaria {
        private double saldo;
        
        public CuentaBancaria(double saldoInicial) {
            this.saldo = saldoInicial;
        }
        
        public synchronized void depositar(double cantidad) {
            System.out.println(Thread.currentThread().getName() + 
                             " depositando $" + cantidad);
            double nuevoSaldo = saldo + cantidad;
            
            try {
                Thread.sleep(100); // Simula procesamiento
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            
            saldo = nuevoSaldo;
            System.out.println(Thread.currentThread().getName() + 
                             " depositó. Saldo: $" + saldo);
        }
        
        public synchronized boolean retirar(double cantidad) {
            System.out.println(Thread.currentThread().getName() + 
                             " intentando retirar $" + cantidad);
            
            if (saldo >= cantidad) {
                try {
                    Thread.sleep(100); // Simula procesamiento
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                
                saldo -= cantidad;
                System.out.println(Thread.currentThread().getName() + 
                                 " retiró. Saldo: $" + saldo);
                return true;
            } else {
                System.out.println(Thread.currentThread().getName() + 
                                 " - Saldo insuficiente");
                return false;
            }
        }
        
        public synchronized double getSaldo() {
            return saldo;
        }
    }
    
    // ========== DEADLOCK (INTERBLOQUEO) ==========
    static class RecursoA {
        public synchronized void metodo1(RecursoB b) {
            System.out.println(Thread.currentThread().getName() + 
                             " tiene RecursoA, esperando RecursoB");
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            b.ultimo();
        }
        
        public synchronized void ultimo() {
            System.out.println("RecursoA.ultimo()");
        }
    }
    
    static class RecursoB {
        public synchronized void metodo2(RecursoA a) {
            System.out.println(Thread.currentThread().getName() + 
                             " tiene RecursoB, esperando RecursoA");
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            a.ultimo();
        }
        
        public synchronized void ultimo() {
            System.out.println("RecursoB.ultimo()");
        }
    }
    
    public static void main(String[] args) throws InterruptedException {
        
        // ========== DEMOSTRACIÓN DE RACE CONDITION ==========
        
        System.out.println("=== RACE CONDITION ===");
        
        ContadorSinSincronizar contadorInseguro = new ContadorSinSincronizar();
        
        Thread[] threadsInseguros = new Thread[10];
        for (int i = 0; i < 10; i++) {
            threadsInseguros[i] = new Thread(() -> {
                for (int j = 0; j < 1000; j++) {
                    contadorInseguro.incrementar();
                }
            });
            threadsInseguros[i].start();
        }
        
        for (Thread t : threadsInseguros) {
            t.join();
        }
        
        System.out.println("Contador sin sincronizar (esperado 10000): " + 
                         contadorInseguro.getCuenta());
        
        // ========== SOLUCIÓN CON SINCRONIZACIÓN ==========
        
        System.out.println("\\n=== CON SINCRONIZACIÓN ===");
        
        ContadorSincronizado contadorSeguro = new ContadorSincronizado();
        
        Thread[] threadsSeguro = new Thread[10];
        for (int i = 0; i < 10; i++) {
            threadsSeguro[i] = new Thread(() -> {
                for (int j = 0; j < 1000; j++) {
                    contadorSeguro.incrementar();
                }
            });
            threadsSeguro[i].start();
        }
        
        for (Thread t : threadsSeguro) {
            t.join();
        }
        
        System.out.println("Contador sincronizado: " + 
                         contadorSeguro.getCuenta());
        
        // ========== CUENTA BANCARIA CONCURRENTE ==========
        
        System.out.println("\\n=== CUENTA BANCARIA ===");
        
        CuentaBancaria cuenta = new CuentaBancaria(1000);
        
        Thread depositador1 = new Thread(() -> {
            cuenta.depositar(500);
        }, "Depositador-1");
        
        Thread depositador2 = new Thread(() -> {
            cuenta.depositar(300);
        }, "Depositador-2");
        
        Thread retirante1 = new Thread(() -> {
            cuenta.retirar(400);
        }, "Retirante-1");
        
        Thread retirante2 = new Thread(() -> {
            cuenta.retirar(600);
        }, "Retirante-2");
        
        depositador1.start();
        depositador2.start();
        retirante1.start();
        retirante2.start();
        
        depositador1.join();
        depositador2.join();
        retirante1.join();
        retirante2.join();
        
        System.out.println("\\nSaldo final: $" + cuenta.getSaldo());
        
        // ========== EJEMPLO DE DEADLOCK ==========
        
        System.out.println("\\n=== DEADLOCK (comentado para evitar bloqueo) ===");
        System.out.println("El siguiente código causaría un deadlock:");
        System.out.println("Thread-1 bloquea A y espera B");
        System.out.println("Thread-2 bloquea B y espera A");
        System.out.println("Ambos esperan indefinidamente");
        
        /*
        RecursoA recursoA = new RecursoA();
        RecursoB recursoB = new RecursoB();
        
        Thread t1 = new Thread(() -> {
            recursoA.metodo1(recursoB);
        }, "Thread-1");
        
        Thread t2 = new Thread(() -> {
            recursoB.metodo2(recursoA);
        }, "Thread-2");
        
        t1.start();
        t2.start();
        
        t1.join();
        t2.join();
        */
    }
}`,
      explanation: "La sincronización previene race conditions cuando múltiples threads acceden a datos compartidos. synchronized en métodos bloquea el objeto completo. synchronized(objeto) bloquea solo ese objeto. Solo un thread puede ejecutar código sincronizado del mismo objeto a la vez. Los problemas comunes son: race condition (múltiples threads modifican datos simultáneamente), deadlock (threads esperan recursos que otros tienen), livelock (threads cambian estado sin progresar). Para evitar deadlock: adquiere locks en orden consistente, usa timeouts, evita locks anidados. synchronized garantiza visibilidad (cambios visibles a otros threads) y atomicidad (operación completa o nada)."
    },
    {
      title: "java.util.concurrent - Herramientas Avanzadas",
      description: "ExecutorService, Future, CompletableFuture y más",
      code: `// JAVA.UTIL.CONCURRENT - HERRAMIENTAS AVANZADAS

import java.util.concurrent.*;
import java.util.*;

public class ConcurrencyAvanzado {
    
    public static void main(String[] args) throws Exception {
        
        // ========== EXECUTOR SERVICE ==========
        
        System.out.println("=== EXECUTOR SERVICE ===");
        
        // Pool de threads fijo
        ExecutorService executor = Executors.newFixedThreadPool(3);
        
        // Enviar tareas
        for (int i = 1; i <= 5; i++) {
            final int taskId = i;
            executor.submit(() -> {
                System.out.println("Tarea " + taskId + " ejecutada por " + 
                                 Thread.currentThread().getName());
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            });
        }
        
        executor.shutdown(); // No acepta más tareas
        executor.awaitTermination(10, TimeUnit.SECONDS); // Espera terminación
        
        // ========== CALLABLE Y FUTURE ==========
        
        System.out.println("\\n=== CALLABLE Y FUTURE ===");
        
        ExecutorService executor2 = Executors.newFixedThreadPool(2);
        
        // Callable retorna un valor
        Callable<Integer> tarea = () -> {
            System.out.println("Calculando...");
            Thread.sleep(2000);
            return 42;
        };
        
        Future<Integer> future = executor2.submit(tarea);
        
        System.out.println("Tarea enviada, haciendo otras cosas...");
        
        // Verificar si terminó
        while (!future.isDone()) {
            System.out.println("Esperando resultado...");
            Thread.sleep(500);
        }
        
        // Obtener resultado (bloquea si no está listo)
        Integer resultado = future.get();
        System.out.println("Resultado: " + resultado);
        
        // Future con timeout
        Future<String> futureConTimeout = executor2.submit(() -> {
            Thread.sleep(5000);
            return "Resultado tardío";
        });
        
        try {
            String res = futureConTimeout.get(2, TimeUnit.SECONDS);
        } catch (TimeoutException e) {
            System.out.println("Timeout: tarea cancelada");
            futureConTimeout.cancel(true);
        }
        
        executor2.shutdown();
        
        // ========== COMPLETABLE FUTURE ==========
        
        System.out.println("\\n=== COMPLETABLE FUTURE ===");
        
        // Tarea asíncrona simple
        CompletableFuture<String> futuro1 = CompletableFuture.supplyAsync(() -> {
            System.out.println("Ejecutando tarea asíncrona...");
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return "Resultado asíncrono";
        });
        
        // Procesar resultado cuando esté listo
        futuro1.thenAccept(resultado2 -> {
            System.out.println("Resultado recibido: " + resultado2);
        });
        
        // Encadenar operaciones
        CompletableFuture<Integer> futuro2 = CompletableFuture.supplyAsync(() -> {
            return 10;
        }).thenApply(n -> {
            System.out.println("Multiplicando por 2...");
            return n * 2;
        }).thenApply(n -> {
            System.out.println("Sumando 5...");
            return n + 5;
        });
        
        System.out.println("Resultado encadenado: " + futuro2.get());
        
        // Combinar múltiples futuros
        CompletableFuture<Integer> futuro3 = CompletableFuture.supplyAsync(() -> 10);
        CompletableFuture<Integer> futuro4 = CompletableFuture.supplyAsync(() -> 20);
        
        CompletableFuture<Integer> suma = futuro3.thenCombine(futuro4, (a, b) -> a + b);
        System.out.println("Suma de futuros: " + suma.get());
        
        // Manejar excepciones
        CompletableFuture<Integer> futuroConError = CompletableFuture.supplyAsync(() -> {
            if (true) throw new RuntimeException("Error simulado");
            return 42;
        }).exceptionally(ex -> {
            System.out.println("Error capturado: " + ex.getMessage());
            return -1;
        });
        
        System.out.println("Resultado con error: " + futuroConError.get());
        
        // ========== COUNTDOWNLATCH ==========
        
        System.out.println("\\n=== COUNTDOWNLATCH ===");
        
        int numTareas = 3;
        CountDownLatch latch = new CountDownLatch(numTareas);
        
        ExecutorService executor3 = Executors.newFixedThreadPool(numTareas);
        
        for (int i = 1; i <= numTareas; i++) {
            final int taskId = i;
            executor3.submit(() -> {
                try {
                    System.out.println("Tarea " + taskId + " iniciada");
                    Thread.sleep(1000 * taskId);
                    System.out.println("Tarea " + taskId + " completada");
                } catch (InterruptedException e) {
                    e.printStackTrace();
                } finally {
                    latch.countDown(); // Decrementa el contador
                }
            });
        }
        
        System.out.println("Esperando a que todas las tareas terminen...");
        latch.await(); // Espera a que el contador llegue a 0
        System.out.println("Todas las tareas completadas");
        
        executor3.shutdown();
        
        // ========== CYCLICBARRIER ==========
        
        System.out.println("\\n=== CYCLICBARRIER ===");
        
        int numThreads = 3;
        CyclicBarrier barrier = new CyclicBarrier(numThreads, () -> {
            System.out.println("Todos los threads llegaron a la barrera");
        });
        
        ExecutorService executor4 = Executors.newFixedThreadPool(numThreads);
        
        for (int i = 1; i <= numThreads; i++) {
            final int threadId = i;
            executor4.submit(() -> {
                try {
                    System.out.println("Thread " + threadId + " trabajando...");
                    Thread.sleep(1000 * threadId);
                    System.out.println("Thread " + threadId + " esperando en barrera");
                    barrier.await(); // Espera a que todos lleguen
                    System.out.println("Thread " + threadId + " continuando");
                } catch (Exception e) {
                    e.printStackTrace();
                }
            });
        }
        
        executor4.shutdown();
        executor4.awaitTermination(10, TimeUnit.SECONDS);
        
        // ========== SEMAPHORE ==========
        
        System.out.println("\\n=== SEMAPHORE ===");
        
        Semaphore semaforo = new Semaphore(2); // Máximo 2 permisos
        
        ExecutorService executor5 = Executors.newFixedThreadPool(5);
        
        for (int i = 1; i <= 5; i++) {
            final int taskId = i;
            executor5.submit(() -> {
                try {
                    System.out.println("Tarea " + taskId + " esperando permiso");
                    semaforo.acquire(); // Adquiere permiso
                    System.out.println("Tarea " + taskId + " ejecutándose");
                    Thread.sleep(2000);
                    System.out.println("Tarea " + taskId + " terminada");
                } catch (InterruptedException e) {
                    e.printStackTrace();
                } finally {
                    semaforo.release(); // Libera permiso
                }
            });
        }
        
        executor5.shutdown();
        executor5.awaitTermination(20, TimeUnit.SECONDS);
        
        // ========== COLECCIONES CONCURRENTES ==========
        
        System.out.println("\\n=== COLECCIONES CONCURRENTES ===");
        
        // ConcurrentHashMap - thread-safe sin sincronizar todo
        ConcurrentHashMap<String, Integer> mapa = new ConcurrentHashMap<>();
        mapa.put("uno", 1);
        mapa.put("dos", 2);
        
        // CopyOnWriteArrayList - thread-safe para lecturas frecuentes
        CopyOnWriteArrayList<String> lista = new CopyOnWriteArrayList<>();
        lista.add("A");
        lista.add("B");
        
        // BlockingQueue - para productor-consumidor
        BlockingQueue<Integer> cola = new LinkedBlockingQueue<>(10);
        
        // Productor
        Thread productor = new Thread(() -> {
            try {
                for (int i = 1; i <= 5; i++) {
                    System.out.println("Produciendo: " + i);
                    cola.put(i); // Bloquea si está llena
                    Thread.sleep(500);
                }
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });
        
        // Consumidor
        Thread consumidor = new Thread(() -> {
            try {
                for (int i = 1; i <= 5; i++) {
                    Integer valor = cola.take(); // Bloquea si está vacía
                    System.out.println("Consumiendo: " + valor);
                    Thread.sleep(1000);
                }
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });
        
        productor.start();
        consumidor.start();
        
        productor.join();
        consumidor.join();
        
        System.out.println("\\nPrograma terminado");
    }
}`,
      explanation: "java.util.concurrent proporciona herramientas avanzadas: ExecutorService gestiona pools de threads (newFixedThreadPool, newCachedThreadPool, newSingleThreadExecutor). Callable retorna valores, Future representa resultado futuro. CompletableFuture permite programación asíncrona con encadenamiento (thenApply, thenCombine, exceptionally). CountDownLatch espera a que N threads completen. CyclicBarrier sincroniza threads en un punto. Semaphore limita acceso concurrente. Colecciones concurrentes (ConcurrentHashMap, CopyOnWriteArrayList, BlockingQueue) son thread-safe sin sincronización manual. BlockingQueue implementa patrón productor-consumidor."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Concurrencia y Threads</h1>
        <p className="text-lg text-gray-600 mb-6">
          Programación multihilo, sincronización y herramientas de concurrencia en Java.
        </p>
        
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">
                <strong>Importante:</strong> La concurrencia es compleja y propensa a errores difíciles
                de detectar (race conditions, deadlocks). Usa herramientas de alto nivel
                (ExecutorService, CompletableFuture) cuando sea posible. Evita sincronización manual
                a menos que sea necesario. Siempre prueba código concurrente exhaustivamente.
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
              <strong>Mejores prácticas:</strong> Prefiere inmutabilidad, usa colecciones concurrentes,
              minimiza secciones críticas, evita locks anidados, usa herramientas de alto nivel,
              documenta políticas de sincronización, y prueba con diferentes cargas y timings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConcurrencyThreads;
