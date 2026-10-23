import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return new NextResponse(null, { status: 401 });

  const projects = await prisma.project.findMany({
    where: { ownerId: userId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) return new NextResponse(null, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const name = typeof body?.name === "string" && body.name.trim() !== "" ? body.name.trim() : "Untitled Project";

  const project = await prisma.project.create({
    data: {
      name,
      ownerId: userId,
    },
  });

  return NextResponse.json(project, { status: 201 });
}
