-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: 2019-05-26 21:30:03
-- 服务器版本： 5.7.26-0ubuntu0.18.04.1
-- PHP Version: 7.2.17-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dog-co`
--

-- --------------------------------------------------------

--
-- 表的结构 `dogs`
--

CREATE TABLE `dogs` (
  `id` mediumint(9) NOT NULL,
  `name` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `age` tinyint(4) NOT NULL,
  `breed` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` mediumint(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `dogs`
--

INSERT INTO `dogs` (`id`, `name`, `age`, `breed`, `user_id`) VALUES
(1, 'Cha-cha', 2, 'Labrador', 1),
(2, 'Kyyamba', 3, 'Husky', 2);

-- --------------------------------------------------------

--
-- 表的结构 `geo_locations`
--

CREATE TABLE `geo_locations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `longitude` int(11) NOT NULL,
  `latitude` int(11) NOT NULL,
  `route_id` int(11) UNSIGNED NOT NULL,
  `create_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `geo_locations`
--

INSERT INTO `geo_locations` (`id`, `longitude`, `latitude`, `route_id`, `create_at`) VALUES
(1, -1177401722, 336350937, 1, '2019-05-26 20:28:29'),
(2, -1177368000, 336368956, 1, '2019-05-26 20:28:30'),
(3, -1177352383, 336370750, 1, '2019-05-26 20:28:32'),
(4, -1177389065, 336325518, 1, '2019-05-26 20:28:35'),
(5, -1177423881, 336306705, 1, '2019-05-26 20:28:39'),
(6, -1177418509, 336337034, 1, '2019-05-26 20:28:44'),
(7, -1177401722, 336350937, 1, '2019-05-26 20:28:54');

-- --------------------------------------------------------

--
-- 表的结构 `routes`
--

CREATE TABLE `routes` (
  `id` int(11) NOT NULL,
  `beneficiary_id` mediumint(9) NOT NULL,
  `provider_id` mediumint(9) NOT NULL,
  `status` enum('planned','ongoing','completed','') COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `routes`
--

INSERT INTO `routes` (`id`, `beneficiary_id`, `provider_id`, `status`) VALUES
(1, 2, 1, 'completed');

-- --------------------------------------------------------

--
-- 表的结构 `users`
--

CREATE TABLE `users` (
  `id` mediumint(9) NOT NULL,
  `username` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `address`) VALUES
(1, 'Jeremy Wang', 'cjwang1990@hotmail.com', '78 Townsend, Irvine, CA, 92620'),
(2, 'Howard Moore', 'shortyshorty@gamil.com', '78 Townsend, Irvine, CA, 92620');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dogs`
--
ALTER TABLE `dogs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Dog_fk0` (`user_id`);

--
-- Indexes for table `geo_locations`
--
ALTER TABLE `geo_locations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `routes`
--
ALTER TABLE `routes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `Route_fk0` (`beneficiary_id`),
  ADD KEY `Route_fk1` (`provider_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `dogs`
--
ALTER TABLE `dogs`
  MODIFY `id` mediumint(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- 使用表AUTO_INCREMENT `geo_locations`
--
ALTER TABLE `geo_locations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- 使用表AUTO_INCREMENT `routes`
--
ALTER TABLE `routes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- 使用表AUTO_INCREMENT `users`
--
ALTER TABLE `users`
  MODIFY `id` mediumint(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- 限制导出的表
--

--
-- 限制表 `dogs`
--
ALTER TABLE `dogs`
  ADD CONSTRAINT `Dog_fk0` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- 限制表 `routes`
--
ALTER TABLE `routes`
  ADD CONSTRAINT `Route_fk0` FOREIGN KEY (`beneficiary_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `Route_fk1` FOREIGN KEY (`provider_id`) REFERENCES `users` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
