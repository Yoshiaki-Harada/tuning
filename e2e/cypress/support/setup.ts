import { Post } from "./model";

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
                        return post;
                    }).then(post => {
                        cy.callFirestore('set', `posts/${f.replace('.json', '')}`, post);
                    });
            });
        })
}