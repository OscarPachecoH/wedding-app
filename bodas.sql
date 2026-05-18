-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-05-2026 a las 01:20:46
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bodas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `matrimonios`
--

CREATE TABLE `matrimonios` (
  `id` int(11) NOT NULL,
  `persona_1_id` int(11) NOT NULL,
  `persona_2_id` int(11) NOT NULL,
  `fecha_matrimonio` date NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personas`
--

CREATE TABLE `personas` (
  `id` int(11) NOT NULL,
  `CURP` varchar(50) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `apellidoPaterno` varchar(30) NOT NULL,
  `apellidoMaterno` varchar(30) NOT NULL,
  `edad` int(11) NOT NULL,
  `sexo` enum('HOMBRE','MUJER') NOT NULL,
  `fechaNacimiento` date NOT NULL,
  `estadoCivil` enum('SOLTERO','CASADO') NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `personas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `username` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('ADMIN','USER') NOT NULL DEFAULT 'USER',
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
-- Puedes cambiarlo antes de exportar la base de datos
-- Ojo: ten cuidado con el apartado de contraseña
--

INSERT INTO `users` (`id`, `name`, `lastname`, `username`, `password`, `role`, `created_at`) VALUES
(1, 'Admin', 'Prueba', '@admin1', '$2b$10$cMSFjk8P4TDSeJwo5MiLVupE3RB17Y7kT3Vi23qKh7ISgvN/iGvXe', 'ADMIN', '2026-05-04 13:56:30');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `matrimonios`
--
ALTER TABLE `matrimonios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `persona_1_id` (`persona_1_id`),
  ADD KEY `persona_2_id` (`persona_2_id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indices de la tabla `personas`
--
ALTER TABLE `personas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `curp` (`CURP`),
  ADD KEY `created_by` (`created_by`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `matrimonios`
--
ALTER TABLE `matrimonios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `personas`
--
ALTER TABLE `personas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `matrimonios`
--
ALTER TABLE `matrimonios`
  ADD CONSTRAINT `matrimonios_ibfk_1` FOREIGN KEY (`persona_1_id`) REFERENCES `personas` (`id`),
  ADD CONSTRAINT `matrimonios_ibfk_2` FOREIGN KEY (`persona_2_id`) REFERENCES `personas` (`id`),
  ADD CONSTRAINT `matrimonios_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `personas`
--
ALTER TABLE `personas`
  ADD CONSTRAINT `personas_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
