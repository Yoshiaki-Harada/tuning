import { Post, User } from "./model";

const resoucePath = 'cypress/resources';
export const clearPostsData = () => {
    console.log('Clear pots data...')
    cy.callFirestore('delete', 'posts', { recursive: true });
}

export const insertPostsData = () => {
    console.log('Insert pots data...')
    cy.task('getFileNames', `${resoucePath}/posts/list`)
        .then(fileNames => {
            (fileNames as string[]).forEach((f) => {
                cy.readFile<Post>(`${resoucePath}/posts/list/${f}`)
                    .then(post => {
                        cy.callFirestore('set', `posts/${f.replace('.json', '')}`, post);
                    });
            });
        })
}

export const createUsers = () => {
    console.log('Create users..')
    cy.task('getFileNames', `${resoucePath}/users`).then(fileNames => {
        (fileNames as string[]).forEach((f) => {
            cy.readFile<User>(`${resoucePath}/users/${f}`)
                .then(user => {
                    cy.task('createUser', { ...user, uid: f.replace('.json', '') }).then(_ => { })
                });
        })
    })
}

// resources直下のuserしかclearできない
export const clearUsers = () => {
    console.log('Clear users..')
    cy.callFirestore('delete', 'users', { recursive: true });
    cy.task('getFileNames', `${resoucePath}/users`).then(fileNames => {
        (fileNames as string[]).forEach((f) => {
            cy.readFile<User>(`${resoucePath}/users/${f}`)
                .then(user => {
                    cy.task('clearUser', user.email).then(_ => { })
                });
        })
    })
}