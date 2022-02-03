create table user_subjects (
    
    id INT not null AUTO_INCREMENT PRIMARY KEY, 
    user_id INT not null,
    subject_id INT not null,

    INDEX(user_id),
    INDEX(subject_id),

    constraint user_subjects__idx__users FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE,
    constraint user_subjects__idx__subjects FOREIGN KEY (subject_id) REFERENCES subjects (id) ON UPDATE CASCADE
    );