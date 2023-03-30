
CREATE TABLE `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `login` VARCHAR(50) NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `email` (
     `id` INT NOT NULL AUTO_INCREMENT,
     `email` VARCHAR(50) NULL,
     `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
     `updated_at` timestamp NULL DEFAULT NULL,
     PRIMARY KEY (`id`)
);
