----------------------------------------------------
-- Users 테이블 생성
----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_name` VARCHAR(255) NOT NULL,
  `user_email` VARCHAR(255) NOT NULL,
  `user_pw` VARCHAR(255) NOT NULL,
  `user_wallet_address` VARCHAR(255),
  `user_token_balance` DECIMAL(20,4),
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

----------------------------------------------------
-- Posts 테이블 생성
----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Posts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `post_title` VARCHAR(255) NOT NULL,
  `post_content` TEXT NOT NULL,
  `writer_id` INT NOT NULL,
  `owner_id` INT NOT NULL,
  `price` DECIMAL(20,4) DEFAULT NULL,
  `gas_fee` DECIMAL(20,4) DEFAULT NULL,
  `view_count` INT DEFAULT 0,
  `sale_status` TINYINT(1) DEFAULT 0,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`writer_id`) REFERENCES `Users`(`id`),
  FOREIGN KEY (`owner_id`) REFERENCES `Users`(`id`)
) ENGINE=InnoDB;

----------------------------------------------------
-- Ads 테이블 생성
----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Ads` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `ad_title` VARCHAR(255) NOT NULL,
  -- ad_content는 S3 업로드 후 반환된 이미지 URL을 저장 (예시 URL 사용)
  `ad_content` TEXT NOT NULL,
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  `user_id` INT NOT NULL,
  `ad_price` DECIMAL(20,4) NOT NULL,
  `click_count` INT DEFAULT 0,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`)
) ENGINE=InnoDB;

----------------------------------------------------
-- Comments 테이블 생성
----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Comments` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `post_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `comment_content` TEXT NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`post_id`) REFERENCES `Posts`(`id`),
  FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`)
) ENGINE=InnoDB;

----------------------------------------------------
-- Transactions 테이블 생성
----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Transactions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `seller_id` INT NOT NULL,
  `buyer_id` INT NOT NULL,
  `post_id` INT NOT NULL,
  `amount` DECIMAL(20,4) NOT NULL,
  `gas_fee` DECIMAL(20,4) DEFAULT 0.001,
  `transaction_type` VARCHAR(255) NOT NULL,
  `transaction_hash` VARCHAR(255) NOT NULL,
  `status` VARCHAR(255) DEFAULT 'completed',
  `transaction_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`seller_id`) REFERENCES `Users`(`id`),
  FOREIGN KEY (`buyer_id`) REFERENCES `Users`(`id`),
  FOREIGN KEY (`post_id`) REFERENCES `Posts`(`id`)
) ENGINE=InnoDB;

----------------------------------------------------
-- AdClicks 테이블 생성
----------------------------------------------------
CREATE TABLE IF NOT EXISTS `AdClicks` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `ad_id` INT NOT NULL,
  `post_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`ad_id`) REFERENCES `Ads`(`id`),
  FOREIGN KEY (`post_id`) REFERENCES `Posts`(`id`),
  FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`)
) ENGINE=InnoDB;

----------------------------------------------------
-- PostLikes 테이블 생성
----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PostLikes` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `post_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`post_id`) REFERENCES `Posts`(`id`),
  FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`)
) ENGINE=InnoDB;

----------------------------------------------------
-- CommentLikes 테이블 생성
----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CommentLikes` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `comment_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`comment_id`) REFERENCES `Comments`(`id`),
  FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`)
) ENGINE=InnoDB;

----------------------------------------------------
-- 초기 데이터 삽입
----------------------------------------------------

-- Users: 3명의 사용자 등록
INSERT INTO Users (user_name, user_email, user_pw, user_wallet_address, user_token_balance, createdAt, updatedAt)
VALUES 
  ('Alice', 'alice@example.com', 'password1', '0xAliceWallet', 1000.0000, NOW(), NOW()),
  ('Bob', 'bob@example.com', 'password2', '0xBobWallet', 500.0000, NOW(), NOW()),
  ('Charlie', 'charlie@example.com', 'password3', '0xCharlieWallet', 750.0000, NOW(), NOW());

-- Posts: 3개의 게시글 등록 (판매 상태 false, price와 gas_fee는 NULL)
INSERT INTO Posts (post_title, post_content, writer_id, owner_id, price, gas_fee, view_count, sale_status, createdAt, updatedAt)
VALUES 
  ('First Post', 'This is the content of the first post.', 1, 1, NULL, NULL, 10, 0, NOW(), NOW()),
  ('Second Post', 'Content of the second post.', 2, 2, NULL, NULL, 20, 0, NOW(), NOW()),
  ('Third Post', 'Another post content example.', 3, 3, NULL, NULL, 5, 0, NOW(), NOW());

-- Ads: 3개의 광고 등록 (ad_content에 예시 이미지 URL 사용)
INSERT INTO Ads (ad_title, ad_content, start_date, end_date, user_id, ad_price, click_count, createdAt, updatedAt)
VALUES
  ('Ad One', 'https://example.com/ad1.jpg', '2025-01-01', '2025-12-31', 1, 100.00, 0, NOW(), NOW()),
  ('Ad Two', 'https://example.com/ad2.jpg', '2025-06-01', '2025-06-30', 2, 150.00, 0, NOW(), NOW()),
  ('Ad Three', 'https://example.com/ad3.jpg', '2025-03-01', '2025-03-31', 3, 200.00, 0, NOW(), NOW());

-- Comments: 각 게시글에 대해 댓글 3개 등록
INSERT INTO Comments (post_id, user_id, comment_content, createdAt, updatedAt)
VALUES
  (1, 2, 'Great post!', NOW(), NOW()),
  (1, 3, 'Thanks for sharing.', NOW(), NOW()),
  (2, 1, 'Interesting perspective.', NOW(), NOW());

-- Transactions: 게시글 판매/구매 거래 내역 예시
INSERT INTO Transactions (seller_id, buyer_id, post_id, amount, gas_fee, transaction_type, transaction_hash, status, transaction_date)
VALUES
  (1, 2, 1, 100.00, 0.001, 'sale', 'txhash1', 'completed', NOW()),
  (2, 3, 2, 150.00, 0.001, 'sale', 'txhash2', 'completed', NOW());

-- AdClicks: 광고 클릭 내역 예시
INSERT INTO AdClicks (ad_id, post_id, user_id, createdAt, updatedAt)
VALUES
  (1, 1, 2, NOW(), NOW()),
  (1, 1, 3, NOW(), NOW()),
  (2, 2, 1, NOW(), NOW());

-- PostLikes: 게시글 좋아요 내역 예시
INSERT INTO PostLikes (post_id, user_id, createdAt, updatedAt)
VALUES
  (1, 2, NOW(), NOW()),
  (1, 3, NOW(), NOW()),
  (2, 1, NOW(), NOW());

-- CommentLikes: 댓글 좋아요 내역 예시
INSERT INTO CommentLikes (comment_id, user_id, createdAt, updatedAt)
VALUES
  (1, 1, NOW(), NOW()),
  (2, 2, NOW(), NOW());