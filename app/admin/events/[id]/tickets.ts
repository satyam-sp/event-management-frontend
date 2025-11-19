import { NextApiRequest, NextApiResponse } from "next";

const mockTickets = [
  { id: 1, eventId: 1, userName: "Alice", seatNumber: "A1", status: "Booked" },
  { id: 2, eventId: 1, userName: "Bob", seatNumber: "A2", status: "Booked" },
  { id: 3, eventId: 2, userName: "Charlie", seatNumber: "B1", status: "Pending" },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const eventTickets = mockTickets.filter(
    (ticket) => ticket.eventId === Number(id)
  );
  res.status(200).json(eventTickets);
}
