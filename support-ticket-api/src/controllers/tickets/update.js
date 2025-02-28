export function update({ request, response, database }) {
    const { id } = request.params;
    const { equipment, description, user_name, status } = request.body;

    const ticket = database.find("ticket", id);

    if (!ticket) {
        return response
            .writeHead(404)
            .end(JSON.stringify({ error: "Ticket not found" }));
    }

    Object.assign(ticket, {
        equipment: equipment ?? ticket.equipment,
        description: description ?? ticket.description,
        user_name: user_name ?? ticket.user_name,
        status: status ?? ticket.status,
        update_at: new Date(),
    });

    database.update("ticket", id, ticket);

    return response.writeHead(200).end(JSON.stringify(ticket));
}