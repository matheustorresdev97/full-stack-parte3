export function create({ response, request }) {
    const { equipment, description, user_name } = request.body;

    const ticket = {
        id: randomUUID(),
        equipment,
        description,
        user_name,
        status: "open",
        create_at: new Date(),
        update_at: new Date(),
    };

    return response.writeHead(201).end(JSON.stringify(ticket));
}