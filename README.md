# ERTEK Web

Landing institucional estática de ERTEK, preparada para:

- correr localmente con Docker
- desplegarse en GitHub Pages desde un repo personal

## Probar localmente con Docker

### Opción rápida con Docker Compose

```bash
docker compose up --build
```

Después abrí:

```text
http://localhost:8080
```

Para frenarlo:

```bash
docker compose down
```

### Opción con Docker directo

```bash
docker build -t ertek-web .
docker run --rm -p 8080:80 ertek-web
```

## Subir a GitHub Pages

1. Creá un repo personal en GitHub.
2. Inicializá Git en esta carpeta:

```bash
git init
git add .
git commit -m "Initial ERTEK site"
git branch -M main
git remote add origin <TU_REPO_GITHUB>
git push -u origin main
```

3. En GitHub, andá a `Settings > Pages`.
4. En `Source`, elegí `GitHub Actions`.
5. Hacé un nuevo push a `main` cuando quieras publicar cambios.

El workflow `/.github/workflows/deploy-pages.yml` va a publicar el sitio automáticamente.

## Estructura

- `index.html`: contenido de la landing
- `styles.css`: estilos y responsive
- `script.js`: interacciones y validación del formulario
- `Dockerfile`: imagen para servir el sitio con nginx
- `compose.yaml`: entorno local con Docker
- `.github/workflows/deploy-pages.yml`: deploy automático a GitHub Pages
- `.nojekyll`: evita procesamiento innecesario de GitHub Pages
