CREATE TABLE `advertisements` (
	`id` varchar(64) NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`imageUrl` text NOT NULL,
	`linkUrl` text NOT NULL,
	`placement` enum('hero','sidebar','footer','modal') NOT NULL,
	`isActive` boolean DEFAULT true,
	`startDate` timestamp,
	`endDate` timestamp,
	`priority` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `advertisements_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `blogPosts` (
	`id` varchar(64) NOT NULL,
	`title` text NOT NULL,
	`slug` varchar(255) NOT NULL,
	`excerpt` text NOT NULL,
	`content` text NOT NULL,
	`image` text NOT NULL,
	`category` varchar(100) NOT NULL,
	`author` varchar(255) NOT NULL,
	`readTime` int NOT NULL,
	`date` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `blogPosts_id` PRIMARY KEY(`id`),
	CONSTRAINT `blogPosts_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `courses` (
	`id` varchar(64) NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`image` text NOT NULL,
	`category` enum('tecnologia','idiomas','corporativo') NOT NULL,
	`niche` varchar(100) NOT NULL,
	`level` enum('iniciante','intermediario','avancado') NOT NULL,
	`price` decimal(10,2) NOT NULL,
	`originalPrice` decimal(10,2),
	`instructor` text NOT NULL,
	`rating` decimal(3,1) DEFAULT '4.5',
	`students` int DEFAULT 0,
	`benefits` json NOT NULL,
	`tags` json NOT NULL,
	`affiliateUrl` text NOT NULL,
	`isRecommended` boolean DEFAULT false,
	`isFeatured` boolean DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `courses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `eBooks` (
	`id` varchar(64) NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`fileUrl` text NOT NULL,
	`fileName` varchar(255) NOT NULL,
	`fileSize` int NOT NULL,
	`category` varchar(100) NOT NULL,
	`downloadCount` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `eBooks_id` PRIMARY KEY(`id`)
);
