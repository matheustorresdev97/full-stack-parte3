export function remove({ request, response, database }) {
    const { id } = request.params

    database.delete("ticket", id)

    return response.end()
}