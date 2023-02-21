export default {
  type: 'object',
  properties: {
    description: { type: 'string' },
    id: { type: 'string' },
    price: { type: 'number' },
    title: { type: 'string' }
  },
} as const;