export default {
  type: 'array',
  properties: {
    description: { type: 'string' },
    id: { type: 'string' },
    price: { type: 'number' },
    title: { type: 'string' }
  },
} as const;