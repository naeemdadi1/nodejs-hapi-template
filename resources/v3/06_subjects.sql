create table subjects (
    id int not null AUTO_INCREMENT PRIMARY KEY,
    name varchar(235), 
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at DATETIME NULL on UPDATE CURRENT_TIMESTAMP, 
    deleted_at DATETIME, 
    INDEX(name)
   );