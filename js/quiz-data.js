const quizData = {
  // 1. IMÁGENES (5 Escenarios)
  quizImagenNivel1: {
    label: "Selección de Imagen",
    questions: [
      {
        // 1. Una sola correcta
        text: "¿Cuál es un dispositivo móvil táctil? (1 Correcta)",
        type: "image",
        multiple: false,
        correct: [1],
        feedback: { correct: "Correcto.", incorrect: "Incorrecto." },
        options: [
          {
            label: "Laptop",
            image:
              "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&q=80",
          },
          {
            label: "Tablet",
            image:
              "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&q=80",
          },
          {
            label: "Monitor",
            image:
              "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&q=80",
          },
        ],
      },
      {
        // 2. Todas correctas
        text: "Selecciona todas las imágenes que representen tecnología (Todas Correctas)",
        type: "image",
        multiple: true,
        correct: [0, 1, 2],
        feedback: {
          correct: "¡Exacto! Todas son correctas.",
          incorrect: "Debías seleccionarlas todas.",
        },
        options: [
          { label: "Laptop", icon: "💻" },
          { label: "Smartwatch", icon: "⌚" },
          { label: "Server", icon: "🗄️" },
        ],
      },
      {
        // 3. Ninguna correcta
        text: "Selecciona el automóvil (Ninguna correcta - Presiona Comprobar sin seleccionar nada)",
        type: "image",
        multiple: true,
        correct: [],
        feedback: {
          correct: "¡Bien hecho! Te diste cuenta que no había ningún auto.",
          incorrect: "Te dejaste engañar, ninguno es un automóvil.",
        },
        options: [
          { label: "Bote", icon: "⛵" },
          { label: "Avión", icon: "✈️" },
          { label: "Tren", icon: "🚂" },
        ],
      },
      {
        // 4. Múltiples correctas
        text: "Selecciona los dispositivos con pantalla incorporada (2 Correctas)",
        type: "image",
        multiple: true,
        correct: [0, 1],
        feedback: {
          correct: "Correcto. El teclado no tiene pantalla.",
          incorrect: "Revisa bien cuáles tienen pantalla.",
        },
        options: [
          { label: "Tablet", icon: "📱" },
          { label: "Laptop", icon: "💻" },
          { label: "Teclado", icon: "⌨️" },
        ],
      },
      {
        // 5. Solo retroalimentación neutral
        text: "Selecciona tu icono favorito (Retroalimentación Neutral con HTML)",
        type: "image",
        multiple: true,
        alwaysNeutral: true,
        feedback: {
          neutral:
            "<div class='html-content-wrap'><p><strong>Opinión registrada.</strong></p><p>En el diseño de interfaces (UI), el uso correcto de iconos ayuda a:</p><ul><li>Reducir la carga cognitiva.</li><li>Ahorrar espacio en pantalla.</li><li>Superar barreras de idioma.</li></ul></div>",
        },
        options: [
          { label: "Fuego", icon: "🔥" },
          { label: "Estrella", icon: "⭐" },
          { label: "Corazón", icon: "❤️" },
        ],
      },
    ],
  },

  // 2. TEXTO (5 Escenarios)
  quizTextoEvaluacion: {
    label: "Opción Múltiple",
    questions: [
      {
        text: "¿Cuál es el atajo para copiar? (1 Correcta)",
        type: "text",
        multiple: false,
        correct: [0],
        feedback: { correct: "Correcto. Ctrl+C.", incorrect: "Es Ctrl+C." },
        options: [
          { label: "Ctrl+C" },
          { label: "Ctrl+X" },
          { label: "Ctrl+V" },
        ],
      },
      {
        text: "¿Cuáles son lenguajes web? (Todas correctas)",
        type: "text",
        multiple: true,
        correct: [0, 1, 2],
        feedback: {
          correct: "¡Excelente! Todos lo son.",
          incorrect: "Debías seleccionar todas las opciones.",
        },
        options: [{ label: "HTML" }, { label: "CSS" }, { label: "JavaScript" }],
      },
      {
        text: "Selecciona las bases de datos NoSQL (Ninguna correcta)",
        type: "text",
        multiple: true,
        correct: [],
        feedback: {
          correct: "Bien hecho. Todas eran SQL.",
          incorrect: "Error. Todas las listadas son relacionales.",
        },
        options: [
          { label: "MySQL" },
          { label: "PostgreSQL" },
          { label: "Oracle" },
        ],
      },
      {
        text: "Selecciona colores primarios (2 Correctas)",
        type: "text",
        multiple: true,
        correct: [0, 1],
        feedback: {
          correct: "Correcto.",
          incorrect: "El verde es secundario en pintura pigmento.",
        },
        options: [{ label: "Rojo" }, { label: "Azul" }, { label: "Verde" }],
      },
      {
        text: "¿Qué opinas del diseño accesible? (Neutral con HTML)",
        type: "text",
        multiple: true,
        alwaysNeutral: true,
        feedback: {
          neutral:
            "<div class='html-content-wrap'><p>La accesibilidad digital es un derecho, no una característica extra.</p><p>Crear formularios interactivos y sistemas de votación inclusivos garantiza que todos los usuarios puedan participar equitativamente.</p></div>",
        },
        options: [
          { label: "Es vital" },
          { label: "Es opcional" },
          { label: "No lo sé" },
        ],
      },
    ],
  },

  // 3. DRAG & DROP (7 Escenarios: 5 Básicos + 2 Detallados)
  quizDragAlimentos: {
    label: "Arrastrar y Soltar",
    questions: [
      {
        // 1. Una sola correcta
        text: "Ordena el proceso UX (1 Orden Correcto):",
        type: "drag",
        mode: "order",
        correctOrder: ["A", "B", "C"],
        feedback: {
          correct: "Orden perfecto.",
          incorrect: "El orden es: Investigación > Wireframes > UI.",
        },
        options: [
          { id: "A", label: "Investigación" },
          { id: "B", label: "Wireframes" },
          { id: "C", label: "Diseño UI" },
        ],
      },
      {
        // 2. Todas correctas (Cualquier orden)
        text: "Arrastra estos elementos a la caja en el orden que prefieras (Cualquier orden es válido):",
        type: "drag",
        mode: "order",
        acceptAnyOrder: true,
        correctOrder: ["A", "B", "C"],
        feedback: {
          correct:
            "¡Perfecto! Al ser subjetivo, cualquier orden cuenta como correcto.",
          incorrect: "",
        },
        options: [
          { id: "A", label: "Música" },
          { id: "B", label: "Cine" },
          { id: "C", label: "Pintura" },
        ],
      },
      {
        // 3. Ninguna correcta (Trampa)
        text: "Arrastra las verduras a la caja de Carnes (Ninguna pertenece - Comprobar sin arrastrar nada):",
        type: "drag",
        mode: "grouping",
        groups: [{ id: "carnes", label: "Carnes", correctItems: [] }],
        feedback: {
          correct: "¡Excelente! No caíste en la trampa.",
          incorrect: "Te dejaste engañar, ninguno de esos elementos es carne.",
        },
        options: [
          { id: "v1", label: "Zanahoria" },
          { id: "v2", label: "Brócoli" },
        ],
      },
      {
        // 4. Múltiples correctas (Simple)
        text: "Separa colores cálidos y fríos:",
        type: "drag",
        mode: "grouping",
        groups: [
          { id: "calido", label: "Cálidos", correctItems: ["rojo"] },
          { id: "frio", label: "Fríos", correctItems: ["azul"] },
        ],
        feedback: {
          correct: "Excelente clasificación.",
          incorrect: "Revisa tu clasificación.",
        },
        options: [
          { id: "rojo", label: "Rojo" },
          { id: "azul", label: "Azul" },
        ],
      },
      {
        // 5. Retroalimentación Neutral
        text: "Coloca tu alimento preferido en la caja (Neutral):",
        type: "drag",
        mode: "grouping",
        alwaysNeutral: true,
        groups: [{ id: "fav", label: "Mi Favorito", correctItems: [] }],
        feedback: {
          neutral:
            "Independientemente de tus preferencias, recuerda mantener una dieta equilibrada.",
        },
        options: [
          { id: "a1", label: "Pizza" },
          { id: "a2", label: "Ensalada" },
        ],
      },
      {
        // 6. EJERCICIO DETALLADO 1 (2 cajas, puras palabras)
        text: "Clasifica los alimentos según su impacto ambiental:",
        type: "drag",
        mode: "grouping",
        groups: [
          {
            id: "malo",
            label: "Alimentos que no son buenos para el medio ambiente",
            correctItems: ["c_res", "c_cerdo", "c_proc", "lacteos", "b_ultra"],
          },
          {
            id: "bueno",
            label: "Alimentos que sí ayudan al medio ambiente",
            correctItems: [
              "verduras",
              "frutas",
              "cereales",
              "granos",
              "tuberculos",
              "leguminosas",
            ],
          },
        ],
        feedback: {
          correct:
            "<div class='html-content-wrap'><p><strong>¡Excelente clasificación!</strong></p><p>Las dietas basadas en plantas tienen una huella de carbono y requerimientos hídricos significativamente menores.</p></div>",
          incorrect:
            "<div class='html-content-wrap'><p><strong>Revisa tu clasificación.</strong></p><p>Recuerda que los productos de origen animal y las bebidas ultraprocesadas requieren grandes cantidades de recursos naturales (agua, tierra) y generan mayores emisiones de gases de efecto invernadero.</p></div>",
        },
        options: [
          { id: "c_res", label: "Carne de res" },
          { id: "c_cerdo", label: "Carne de cerdo" },
          { id: "verduras", label: "Verduras" },
          { id: "frutas", label: "Frutas" },
          { id: "c_proc", label: "Carnes procesadas" },
          { id: "lacteos", label: "Lácteos" },
          { id: "cereales", label: "Cereales integrales" },
          { id: "granos", label: "Granos enteros" },
          { id: "b_ultra", label: "Bebidas ultraprocesadas" },
          { id: "tuberculos", label: "Tubérculos" },
          { id: "leguminosas", label: "Leguminosas" },
        ],
      },
      {
        // 7. EJERCICIO DETALLADO 2 (3 cajas, puras imágenes)
        text: "Clasifica los alimentos por su nivel de procesamiento (Sistema NOVA):",
        type: "drag",
        mode: "grouping",
        imageOnly: true,
        groups: [
          {
            id: "nat",
            label: "Naturales o mínimamente procesados",
            correctItems: ["leche", "avena", "arroz", "jicama", "nopal"],
          },
          {
            id: "proc",
            label: "Procesados",
            correctItems: ["v_lata", "pan_art"],
          },
          {
            id: "ultra",
            label: "Ultraprocesados",
            correctItems: ["soda", "papas", "salchicha", "donas"],
          },
        ],
        feedback: {
          correct: "Clasificación perfecta del sistema NOVA.",
          incorrect:
            "<div class='html-content-wrap'><p><strong>Algunos alimentos están en la categoría equivocada.</strong></p><ul><li>Los enlatados simples son <em>procesados</em>.</li><li>La comida rápida, sodas y frituras de bolsa son <em>ultraprocesados</em>.</li></ul></div>",
        },
        options: [
          {
            id: "leche",
            label: "Leche",
            image:
              "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=150&q=80",
          },
          {
            id: "avena",
            label: "Avena",
            image:
              "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=150&q=80",
          },
          {
            id: "arroz",
            label: "Arroz",
            image:
              "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=150&q=80",
          },
          {
            id: "jicama",
            label: "Jícama",
            image:
              "https://images.unsplash.com/photo-1596472288151-50e8a71b12b5?w=150&q=80",
          },
          {
            id: "nopal",
            label: "Nopal",
            image:
              "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=150&q=80",
          },
          {
            id: "v_lata",
            label: "Verduras enlatadas",
            image:
              "https://images.unsplash.com/photo-1598216117326-85750c184d08?w=150&q=80",
          },
          {
            id: "pan_art",
            label: "Pan Artesanal",
            image:
              "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=150&q=80",
          },
          {
            id: "soda",
            label: "Soda",
            image:
              "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=150&q=80",
          },
          {
            id: "papas",
            label: "Papas fritas envasadas",
            image:
              "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=150&q=80",
          },
          {
            id: "salchicha",
            label: "Salchicha",
            image:
              "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=150&q=80",
          },
          {
            id: "donas",
            label: "Donas",
            image:
              "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=150&q=80",
          },
        ],
      },
    ],
  },

  // 4. HOTSPOT (5 Escenarios)
  quizHotspotCelula: {
    label: "Áreas Interactivas",
    questions: [
      {
        text: "Haz clic en el cuadrante inferior derecho (1 Correcta):",
        type: "hotspot",
        multiple: false,
        regions: [
          {
            id: "a",
            label: "Izq",
            x: "5%",
            y: "10%",
            w: "40%",
            h: "80%",
            correct: false,
          },
          {
            id: "b",
            label: "Der",
            x: "55%",
            y: "10%",
            w: "40%",
            h: "80%",
            correct: true,
          },
        ],
        feedback: { correct: "Correcto.", incorrect: "Incorrecto." },
      },
      {
        text: "Selecciona todos los organelos visibles (Todas correctas):",
        type: "hotspot",
        multiple: true,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Plant_cell_structure-es.svg/1024px-Plant_cell_structure-es.svg.png",
        regions: [
          {
            id: "r1",
            label: "Núcleo",
            x: "42%",
            y: "45%",
            w: "15%",
            h: "15%",
            correct: true,
          },
          {
            id: "r2",
            label: "Pared",
            x: "85%",
            y: "20%",
            w: "12%",
            h: "10%",
            correct: true,
          },
        ],
        feedback: {
          correct: "¡Exacto! Seleccionaste todos.",
          incorrect: "Faltaron organelos por seleccionar.",
        },
      },
      {
        text: "Selecciona el motor de combustión en esta célula (Ninguna correcta - Comprobar en vacío):",
        type: "hotspot",
        multiple: true,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Plant_cell_structure-es.svg/1024px-Plant_cell_structure-es.svg.png",
        regions: [
          {
            id: "r1",
            label: "Núcleo",
            x: "42%",
            y: "45%",
            w: "15%",
            h: "15%",
            correct: false,
          },
          {
            id: "r2",
            label: "Pared",
            x: "85%",
            y: "20%",
            w: "12%",
            h: "10%",
            correct: false,
          },
        ],
        feedback: {
          correct: "¡Muy inteligente! Las células no tienen motores.",
          incorrect: "Elegiste un área, pero no hay motores aquí.",
        },
      },
      {
        text: "Selecciona Pared y Membrana (2 Correctas):",
        type: "hotspot",
        multiple: true,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Plant_cell_structure-es.svg/1024px-Plant_cell_structure-es.svg.png",
        regions: [
          {
            id: "r1",
            label: "Núcleo",
            x: "42%",
            y: "45%",
            w: "15%",
            h: "15%",
            correct: false,
          },
          {
            id: "r2",
            label: "Pared",
            x: "85%",
            y: "20%",
            w: "12%",
            h: "10%",
            correct: true,
          },
          {
            id: "r3",
            label: "Membrana",
            x: "70%",
            y: "85%",
            w: "12%",
            h: "10%",
            correct: true,
          },
        ],
        feedback: {
          correct: "¡Excelente!",
          incorrect: "Revisa las barreras externas.",
        },
      },
      {
        text: "Explora la célula seleccionando áreas (Neutral):",
        type: "hotspot",
        multiple: true,
        alwaysNeutral: true,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Plant_cell_structure-es.svg/1024px-Plant_cell_structure-es.svg.png",
        regions: [
          {
            id: "r1",
            label: "Área 1",
            x: "42%",
            y: "45%",
            w: "15%",
            h: "15%",
            correct: false,
          },
          {
            id: "r2",
            label: "Área 2",
            x: "85%",
            y: "20%",
            w: "12%",
            h: "10%",
            correct: false,
          },
        ],
        feedback: {
          neutral:
            "<div class='html-content-wrap'><p><strong>Célula Vegetal</strong></p><p>A diferencia de la animal, posee una pared celular rígida y cloroplastos.</p></div>",
        },
      },
    ],
  },
};
