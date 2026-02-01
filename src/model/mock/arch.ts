/**
 * Mock data: ASCII architecture diagrams for `arch`. Replace with API later.
 * Static, ASCII only. No SVGs, no images.
 */

export function getArchDiagrams(): string {
  return [
    'Backend architecture',
    '─────────────────────',
    '',
    '  [ Client ]',
    '      |',
    '      v',
    '  [ API Gateway ]',
    '      |',
    '      v',
    '  [ Golang Services ] ---> [ PostgreSQL ]',
    '      |',
    '      +--> [ Redis ]',
    '      +--> [ Kafka ]',
    '',
    'Mobile + backend flow',
    '─────────────────────',
    '',
    '  [ Flutter App ] <---> [ REST / gRPC ] <---> [ Go backend ]',
    '       |',
    '       +--> [ Firebase ]',
    '',
    'Astra88 engagement model',
    '────────────────────────',
    '',
    '  [ Product team ] --> [ Astra88 ] --> [ Go | React | Flutter ]',
    '                            |',
    '                            +--> [ Research ]',
  ].join('\n')
}
