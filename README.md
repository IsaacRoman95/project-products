<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

## Sobre el proyecto
<p id="description">Aplicación web sobre ventas y productos mediante usuarios autenticados.</p>

<h2>🛠️ Installation Steps:</h2>
<p>Para desplegar el proyecto de forma local puede usted seguir los siguientes pasos</p>
<br>
<p>1. Clona el repositorio:</p>

```
gh repo clone IsaacRoman95/project-products
```
<br>

<p>2. Instala las dependencias PHP con Composer:</p>

```
composer install
```
<br>

<p>3. Copia el archivo .env.example y renómbralo a .env. Luego configura las variables de entorno según tu entorno local:</p>
<p>Se recomienda mantener la estructura y la configurar mencionada en el archivo de .env.example puesto que alli ya se realizó la configuración correspondiente a la base de datos, asi como el envio de los correos de confirmación.</p>

```
cp .env.example .env
```
<br>

<p>4. Genera la clave de aplicación:</p>

```
php artisan key:generate
```
<br>

<p>5. Creación del Enlace Simbólico:</p>
<p>Esto con el fin de poder acceder a los archivos almacenados en storage/app/public desde public/storage</p>

```
php artisan storage:link
```
<br>

<p>6. Crea una base de datos en mysql con el nombre dbproducts</p>
<p>Es importante mantener el mismo nombre para que no existan conflictos al momento de ejecutar las migraciones de la base de datos.</p>

```
CREATE DATABASE IF NOT EXISTS dbproducts;
```
<p>En el caso que usted decida crear la base de datos con otro nombre debe especificar ese nombre de su base de datos en el archivo .env</p>

<br>

<p>7. Ejecuta las migraciones y los seeders</p>
<p>Esto generará de forma automática las tablas de la base de datos y sus respectivos registros de pruebas.</p>

```
php artisan migrate --seed
```
<br>

<p>8. Ejecuta la aplicación</p>
<p>Por ultimo para ejecutar la aplicación, ubícate en el proyecto y escribe los siguientes comandos en consolas diferentes. De esta forma podrás inicializar el servidor y poder probar la página web.</p>

```
npm run dev
php artisan serve
```

<br>
 
<h2>💻 Algunos de los packages utilizados fueron</h2>

Technologies used in the project:

*   Laravel
*   Laravel Breeze
*   Spatie Laravel Permissions
*   Carbon
*   Blueprint
*   Inertia

Extra:

*    ReactJS
*    TailwindCSS
*    ToastJS

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
