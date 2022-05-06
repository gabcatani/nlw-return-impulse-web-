import { prisma } from './prisma';
import express from 'express';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedback-repository';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';

export const routes = express.Router();



routes.post('/feedbacks', async (req, res) => {

    const { type, comment, screenshot } = req.body;
    
    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const nodemailerMailAdapter = new NodemailerMailAdapter();

    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
        prismaFeedbacksRepository,
        nodemailerMailAdapter
        )

    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot,
    })

    

     return res.status(201).send();
})

routes.get('/', async (req, res) => {
    const posts = await prisma.feedback.findMany()
      res.json(posts)
})

routes.get('/feedback/:id', async (req, res) => {
    const { id } = req.params
    console.log(id)
    const post = await prisma.feedback.findUnique({
      where: { id: String(id) }
    })
    res.json(post)
})

