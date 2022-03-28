import Fastify from 'fastify'

const fastify = Fastify({ logger: true });

fastify.addHook('onClose', async function () {
    console.log('\Shutting down')
})

fastify.get('/healthcheck', async function () {
    return { ok: true }
})

async function closeGracefully() {
    await fastify.close()
    process.exit(0)
}
process.on('SIGINT', closeGracefully)
process.on('SIGTERM', closeGracefully)

fastify.listen(3000).catch(e => {
    fastify.log.error(e)
    process.exit(1);
})