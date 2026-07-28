//Tipos/Interfaces de cada evento

export class EventPayloadInterface<T> {
  constructor(
    public readonly event: string,
    public readonly data: T,
  ) {
    if (!event || !data) {
      throw new Error('Event and data are required');
    }
  }
}
