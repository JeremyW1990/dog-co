-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 23, 2019 at 02:48 PM
-- Server version: 5.7.26-0ubuntu0.18.04.1
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
-- Table structure for table `Dog`
--

CREATE TABLE `Dog` (
  `id` mediumint(9) NOT NULL,
  `name` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `age` tinyint(4) NOT NULL,
  `breed` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` mediumint(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Dog`
--

INSERT INTO `Dog` (`id`, `name`, `age`, `breed`, `user_id`) VALUES
(1, 'Cha-cha', 2, 'Labrador', 1),
(2, 'Kyyamba', 3, 'Husky', 2);

-- --------------------------------------------------------

--
-- Table structure for table `GeoLocation`
--

CREATE TABLE `GeoLocation` (
  `id` bigint(20) NOT NULL,
  `longitude` int(11) NOT NULL,
  `latitude` int(11) NOT NULL,
  `route_id` int(11) NOT NULL,
  `create_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `GeoLocation`
--

INSERT INTO `GeoLocation` (`id`, `longitude`, `latitude`, `route_id`, `create_at`) VALUES
(1, 336350947, -1177401712, 1, '2019-04-04 13:44:30'),
(2, 336350957, -1177401702, 1, '2019-04-04 13:44:31'),
(3, 336350967, -1177401692, 1, '2019-04-04 13:44:32'),
(4, 336350977, -1177401682, 1, '2019-04-04 13:44:33'),
(5, 336350987, -1177401672, 1, '2019-04-04 13:44:34'),
(6, 336350997, -1177401662, 1, '2019-04-04 13:44:35'),
(7, 336351007, -1177401652, 1, '2019-04-04 13:44:36'),
(8, 336351017, -1177401642, 1, '2019-04-04 13:44:37'),
(9, 336351027, -1177401632, 1, '2019-04-04 13:44:38'),
(10, 336351037, -1177401622, 1, '2019-04-04 13:44:39'),
(11, 336351047, -1177401612, 1, '2019-04-04 13:44:40'),
(12, 336351057, -1177401602, 1, '2019-04-04 13:44:41'),
(13, 336351067, -1177401592, 1, '2019-04-04 13:44:42'),
(14, 336351077, -1177401582, 1, '2019-04-04 13:44:43'),
(15, 336351087, -1177401572, 1, '2019-04-04 13:44:44'),
(16, 336351097, -1177401562, 1, '2019-04-04 13:44:45'),
(17, 336351107, -1177401552, 1, '2019-04-04 13:44:46'),
(18, 336351117, -1177401542, 1, '2019-04-04 13:44:47'),
(19, 336351127, -1177401532, 1, '2019-04-04 13:44:48'),
(20, 336351137, -1177401522, 1, '2019-04-04 13:44:49'),
(21, 336351147, -1177401512, 1, '2019-04-04 13:44:50'),
(22, 336351157, -1177401502, 1, '2019-04-04 13:44:51'),
(23, 336351167, -1177401492, 1, '2019-04-04 13:44:52'),
(24, 336351177, -1177401482, 1, '2019-04-04 13:44:53'),
(25, 336351187, -1177401472, 1, '2019-04-04 13:44:54'),
(26, 336351197, -1177401462, 1, '2019-04-04 13:44:55'),
(27, 336351207, -1177401452, 1, '2019-04-04 13:44:56'),
(28, 336351217, -1177401442, 1, '2019-04-04 13:44:57'),
(29, 336351227, -1177401432, 1, '2019-04-04 13:44:58'),
(30, 336351237, -1177401422, 1, '2019-04-04 13:44:59'),
(31, 336351247, -1177401412, 1, '2019-04-04 13:45:00'),
(32, 336351257, -1177401402, 1, '2019-04-04 13:45:01'),
(33, 336351267, -1177401392, 1, '2019-04-04 13:45:02'),
(34, 336351277, -1177401382, 1, '2019-04-04 13:45:03'),
(35, 336351287, -1177401372, 1, '2019-04-04 13:45:04'),
(36, 336351297, -1177401362, 1, '2019-04-04 13:45:05'),
(37, 336351307, -1177401352, 1, '2019-04-04 13:45:06'),
(38, 336351317, -1177401342, 1, '2019-04-04 13:45:07'),
(39, 336351327, -1177401332, 1, '2019-04-04 13:45:08'),
(40, 336351337, -1177401322, 1, '2019-04-04 13:45:09'),
(41, 336351347, -1177401312, 1, '2019-04-04 13:45:10'),
(42, 336351357, -1177401302, 1, '2019-04-04 13:45:11'),
(43, 336351367, -1177401292, 1, '2019-04-04 13:45:12'),
(44, 336351377, -1177401282, 1, '2019-04-04 13:45:13'),
(45, 336351387, -1177401272, 1, '2019-04-04 13:45:14'),
(46, 336351397, -1177401262, 1, '2019-04-04 13:45:15'),
(47, 336351407, -1177401252, 1, '2019-04-04 13:45:16'),
(48, 336351417, -1177401242, 1, '2019-04-04 13:45:17'),
(49, 336351427, -1177401232, 1, '2019-04-04 13:45:18'),
(50, 336351437, -1177401222, 1, '2019-04-04 13:45:19'),
(51, 336351447, -1177401212, 1, '2019-04-04 13:45:20'),
(52, 336351457, -1177401202, 1, '2019-04-04 13:45:21'),
(53, 336351467, -1177401192, 1, '2019-04-04 13:45:22'),
(54, 336351477, -1177401182, 1, '2019-04-04 13:45:23'),
(55, 336351487, -1177401172, 1, '2019-04-04 13:45:24'),
(56, 336351497, -1177401162, 1, '2019-04-04 13:45:25'),
(57, 336351507, -1177401152, 1, '2019-04-04 13:45:26'),
(58, 336351517, -1177401142, 1, '2019-04-04 13:45:27'),
(59, 336351527, -1177401132, 1, '2019-04-04 13:45:28'),
(60, 336351537, -1177401122, 1, '2019-04-04 13:45:29'),
(61, 336351547, -1177401112, 1, '2019-04-04 13:45:30'),
(62, 336351557, -1177401102, 1, '2019-04-04 13:45:31'),
(63, 336351567, -1177401092, 1, '2019-04-04 13:45:32'),
(64, 336351577, -1177401082, 1, '2019-04-04 13:45:33'),
(65, 336351587, -1177401072, 1, '2019-04-04 13:45:34'),
(66, 336351597, -1177401062, 1, '2019-04-04 13:45:35'),
(67, 336351607, -1177401052, 1, '2019-04-04 13:45:36'),
(68, 336351617, -1177401042, 1, '2019-04-04 13:45:37'),
(69, 336351627, -1177401032, 1, '2019-04-04 13:45:38'),
(70, 336351637, -1177401022, 1, '2019-04-04 13:45:39'),
(71, 336351647, -1177401012, 1, '2019-04-04 13:45:40'),
(72, 336351657, -1177401002, 1, '2019-04-04 13:45:41'),
(73, 336351667, -1177400992, 1, '2019-04-04 13:45:42'),
(74, 336351677, -1177400982, 1, '2019-04-04 13:45:43'),
(75, 336351687, -1177400972, 1, '2019-04-04 13:45:44'),
(76, 336351697, -1177400962, 1, '2019-04-04 13:45:45'),
(77, 336351707, -1177400952, 1, '2019-04-04 13:45:46'),
(78, 336351717, -1177400942, 1, '2019-04-04 13:45:47'),
(79, 336351727, -1177400932, 1, '2019-04-04 13:45:48'),
(80, 336351737, -1177400922, 1, '2019-04-04 13:45:49'),
(81, 336351747, -1177400912, 1, '2019-04-04 13:45:50'),
(82, 336351757, -1177400902, 1, '2019-04-04 13:45:51'),
(83, 336351767, -1177400892, 1, '2019-04-04 13:45:52'),
(84, 336351777, -1177400882, 1, '2019-04-04 13:45:53'),
(85, 336351787, -1177400872, 1, '2019-04-04 13:45:54'),
(86, 336351797, -1177400862, 1, '2019-04-04 13:45:55'),
(87, 336351807, -1177400852, 1, '2019-04-04 13:45:56'),
(88, 336351817, -1177400842, 1, '2019-04-04 13:45:57'),
(89, 336351827, -1177400832, 1, '2019-04-04 13:45:58'),
(90, 336351837, -1177400822, 1, '2019-04-04 13:45:59'),
(91, 336351847, -1177400812, 1, '2019-04-04 13:46:00'),
(92, 336351857, -1177400802, 1, '2019-04-04 13:46:01'),
(93, 336351867, -1177400792, 1, '2019-04-04 13:46:02'),
(94, 336351877, -1177400782, 1, '2019-04-04 13:46:03'),
(95, 336351887, -1177400772, 1, '2019-04-04 13:46:04'),
(96, 336351897, -1177400762, 1, '2019-04-04 13:46:05'),
(97, 336351907, -1177400752, 1, '2019-04-04 13:46:06'),
(98, 336351917, -1177400742, 1, '2019-04-04 13:46:07'),
(99, 336351927, -1177400732, 1, '2019-04-04 13:46:08');

-- --------------------------------------------------------

--
-- Table structure for table `Route`
--

CREATE TABLE `Route` (
  `id` int(11) NOT NULL,
  `beneficiary_id` mediumint(9) NOT NULL,
  `provider_id` mediumint(9) NOT NULL,
  `status` enum('planned','ongoing','completed','') COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Route`
--

INSERT INTO `Route` (`id`, `beneficiary_id`, `provider_id`, `status`) VALUES
(1, 2, 1, 'completed');

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `id` mediumint(9) NOT NULL,
  `username` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`id`, `username`, `email`, `address`) VALUES
(1, 'Jeremy Wang', 'cjwang1990@hotmail.com', '78 Townsend, Irvine, CA, 92620'),
(2, 'Howard Moore', 'shortyshorty@gamil.com', '78 Townsend, Irvine, CA, 92620');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Dog`
--
ALTER TABLE `Dog`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Dog_fk0` (`user_id`);

--
-- Indexes for table `GeoLocation`
--
ALTER TABLE `GeoLocation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `GeoLocation_fk0` (`route_id`);

--
-- Indexes for table `Route`
--
ALTER TABLE `Route`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `Route_fk0` (`beneficiary_id`),
  ADD KEY `Route_fk1` (`provider_id`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Dog`
--
ALTER TABLE `Dog`
  MODIFY `id` mediumint(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `GeoLocation`
--
ALTER TABLE `GeoLocation`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;
--
-- AUTO_INCREMENT for table `Route`
--
ALTER TABLE `Route`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `id` mediumint(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `Dog`
--
ALTER TABLE `Dog`
  ADD CONSTRAINT `Dog_fk0` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`);

--
-- Constraints for table `GeoLocation`
--
ALTER TABLE `GeoLocation`
  ADD CONSTRAINT `GeoLocation_fk0` FOREIGN KEY (`route_id`) REFERENCES `Route` (`id`);

--
-- Constraints for table `Route`
--
ALTER TABLE `Route`
  ADD CONSTRAINT `Route_fk0` FOREIGN KEY (`beneficiary_id`) REFERENCES `User` (`id`),
  ADD CONSTRAINT `Route_fk1` FOREIGN KEY (`provider_id`) REFERENCES `User` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
