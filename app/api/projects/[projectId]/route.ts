import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { auth } from "@clerk/nextjs/server";

async function resolveProjectIdFromContext(context: { params: any }) {
  const params = context?.params;
  if (!params) return undefined;
  // params may be a Promise in some Next types; await if so
  const resolved = typeof params.then === "function" ? await params : params;
  return resolved?.projectId as string | undefined;
}

export async function PATCH(request: NextRequest, context: { params: any }) {
  const { userId } = await auth();
  if (!userId) return new NextResponse(null, { status: 401 });

  const projectId = await resolveProjectIdFromContext(context);
  if (!projectId) return new NextResponse(null, { status: 400 });

  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project) return new NextResponse(null, { status: 404 });
  if (project.ownerId !== userId) return new NextResponse(null, { status: 403 });

  const body = await request.json().catch(() => ({}));
  const name = typeof body?.name === "string" && body.name.trim() !== "" ? body.name.trim() : undefined;
  if (typeof name === "undefined") return new NextResponse(null, { status: 400 });

  const updated = await prisma.project.update({ where: { id: projectId }, data: { name } });
  return NextResponse.json(updated);
}

export async function DELETE(_request: NextRequest, context: { params: any }) {
  const { userId } = await auth();
  if (!userId) return new NextResponse(null, { status: 401 });

  const projectId = await resolveProjectIdFromContext(context);
  if (!projectId) return new NextResponse(null, { status: 400 });

  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project) return new NextResponse(null, { status: 404 });
  if (project.ownerId !== userId) return new NextResponse(null, { status: 403 });

  await prisma.project.delete({ where: { id: projectId } });
  return new NextResponse(null, { status: 204 });
}
