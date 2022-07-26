DROP TABLE IF EXISTS users_playlists;
DROP TABLE IF EXISTS users_authorities;
DROP TABLE IF EXISTS song_authors;
DROP TABLE IF EXISTS song_albums;
DROP TABLE IF EXISTS playlist_songs;
DROP TABLE IF EXISTS author_albums;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS song;
DROP TABLE IF EXISTS playlist;
DROP TABLE IF EXISTS authority;
DROP TABLE IF EXISTS author;
DROP TABLE IF EXISTS album;
create table album
(
    id   bigint generated by default as identity
        primary key,
    name varchar(255),
    year varchar(255)
);

create table author
(
    id   bigint generated by default as identity
        primary key,
    name varchar(255)
);

create table authority
(
    id   bigint generated by default as identity
        primary key,
    name varchar(255)
);

create table playlist
(
    id   bigint generated by default as identity
        primary key,
    name varchar(255)
);

create table song
(
    id        bigint generated by default as identity
        primary key,
    playtime  varchar(255),
    song_name varchar(255)
);

create table users
(
    username varchar(255) not null
        primary key,
    password varchar(255)
);

create table author_albums
(
    author_id bigint not null,
    albums_id bigint not null,
    FOREIGN KEY (author_id) REFERENCES author(id),
    FOREIGN KEY (albums_id) REFERENCES album(id)
);

create table playlist_songs
(
    playlist_id bigint not null,
    songs_id    bigint not null,
    FOREIGN KEY (playlist_id) REFERENCES playlist(id),
    FOREIGN KEY (songs_id) REFERENCES song(id)
);

create table song_albums
(
    songs_id  bigint not null,
    albums_id bigint not null,
    FOREIGN KEY (songs_id) REFERENCES song(id),
    FOREIGN KEY (albums_id) REFERENCES album(id)
);

create table song_authors
(
    song_id    bigint not null,
    authors_id bigint not null,
    FOREIGN KEY (song_id) REFERENCES song(id),
    FOREIGN KEY (authors_id) REFERENCES author(id)
);

create table users_authorities
(
    user_username  varchar(255) not null,
    authorities_id bigint       not null,
    FOREIGN KEY (user_username) REFERENCES users(username),
    FOREIGN KEY (authorities_id) REFERENCES authority(id)
);


create table users_playlists
(
    user_username varchar(255) not null,
    playlists_id  bigint       not null,
    FOREIGN KEY (user_username) REFERENCES users(username),
    FOREIGN KEY (playlists_id) REFERENCES playlist(id)
);