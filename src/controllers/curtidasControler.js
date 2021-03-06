const connection = require("./../database/connetcion");

module.exports = {
    /**
     * Retorna todas as curtidas do banco de dados.
     * Saída: [{id,usuario_id,post_id},...]
     * @param {*} request
     * @param {*} response
     */
    index(request, response) {
        connection("curtidas")
            .select("*")
            .then(res => {
                response.json(res);
            })
            .catch(error => {
                response.status(500).send(error.toString());
            });
    },

    /**
     * Curte um comentário.
     * Entrada: [Query] {userId,postId}
     * Saída: {id}, se um usuario tentar curtir o mesmo post duas vezes o id será -1
     * @param {*} request
     * @param {*} response
     */
    //TODO: Melhorar verificação
    create(request, response) {
        const { userId, postId } = request.query;

        connection("curtidas")
            .where({ usuario_id: userId, post_id: postId })
            .then(res1 => {
                if (res1.length == 0) {
                    connection("curtidas")
                        .insert({ usuario_id: userId, post_id: postId })
                        .then(res => {
                            response.sendStatus(200);
                        })
                        .catch(error => {
                            response.status(500).send(error.toString());
                        });
                } else {
                    response.status(409).send("user alread liked");
                }
            })
            .catch(error => {
                response.status(500).send(error.toString());
            });
    },

    /**
     * Remove o comentário de um post.
     * Entrada: [Query] {userId,postId}
     * Saída: Numero de curtidas removidas
     * @param {*} request
     * @param {*} response
     */
    //TODO: Verificar pq não funciona
    remove(request, response) {
        const { userId, postId } = request.query;
        connection("curtidas")
            .where({ usuario_id: userId, post_id: postId })
            .del()
            .then(res => {
                if (res === 0) response.sendStatus(404);
                else response.sendStatus(200);
            })
            .catch(error => {
                response.status(500).send(error.toString());
            });
    },

    /**
     * Retorna o id dos post que o usuario curtiu.
     * Entrada: [Params] {id}
     * Saída: [{post_id},...]
     * @param {*} request
     * @param {*} response
     */
    getByUser(request, response) {
        const { id } = request.params;
        connection("curtidas")
            .where("usuario_id", id)
            .select("post_id")
            .then(res => {
                if (res.length === 0) response.sendStatus(404);
                else response.status(200).json(res);
            })
            .catch(error => {
                response.status(500).send(error.toString());
            });
    },

    /**
     * Retorna o id dos usuarios que curtiram este post.
     * Entrada: [Params] {id}
     * Saída: [{usuario_id},...]
     * @param {*} request
     * @param {*} response
     */
    getByPost(request, response) {
        const { id } = request.params;
        connection("curtidas")
            .where("post_id", id)
            .select("usuario_id")
            .then(res => {
                if (res.length === 0) response.sendStatus(404);
                response.status(200).json(res);
            })
            .catch(error => {
                response.status(500).send(error.toString());
            });
    },
};
