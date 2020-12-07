const NOT_FOUND = {
  status: 404,
  title: 'API não encontrada',
  message: 'Ops... Infelizmente não encontramos essa API',
};

const UNKNOWN = {
  status: 500,
  title: 'Página de erro',
  message: 'Erro interno. Nossa equipe de suporte já foi informada do ocorrido.',
};

const TOKEN_INVALID = {
  status: 403,
  title: 'Metodo de autenticação não disponível',
  message: 'Metodo de autenticação não disponível',
};

const TOKEN_EXPIRED = {
  status: 403,
  title: 'O token expirado!',
  message: 'Token passado não pode mais ser usado pois foi expirado!',
};

const USER_CREDENTIALS_INVALID = {
  status: 403,
  name: 'UserCredentialsException',
  title: 'Credenciais incorretas',
  message: 'Não foi possível identificar o usuário',
};

const HEADER_CONTENT_TYPE_NOT_ACCEPT = {
  status: 400,
  name: 'HeaderContentTypeNotAcceptException',
  title: 'Cabeçalho com dados inválidos!',
  message: '...',
};

const AUTH_NOT_BEARER = {
  status: 403,
  title: 'Metodo de autenticação não disponível',
  message: 'Metodo de autenticação não disponível',
};

const AUTH_FAIL = {
  status: 500,
  title: 'Falha na autenticação',
  message: 'Algum erro interno aconteceu enquanto tentávamos autenticar sua requisição',
};

const AUTH_REQUIRED_FIELDS = {
  status: 400,
  name: 'AuthFieldsErrorException',
  title: 'Campos para login estão inválidos',
  message: '...',
};

const AUTH_USER_NOT_EXIST = {
  status: 400,
  name: 'AuthUserNotExistException',
  title: 'Usuário não encontrado',
  message: '...',
};

const DATA_NOT_FOUND = {
  status: 404,
  name: 'DataNotFoundException',
  title: 'O identificador passado não existe',
  message: 'O identificador passado não existe',
};

const VOTE_UNIQUE = {
  status: 403,
  name: 'VoteUniqueException',
  title: 'Você já realizou a votação para esse filme',
  message: '...',
};

const PERMISSION_DENIED = {
  status: 403,
  name: 'PermissionDeniedException',
  title: 'Opa... Você não permissão pra executar essa ação',
  message: '...',
};

/**
 * Não foi permitido o envio do contato via pre-reserva ou formulário de contato
 */
const ACTION_VALIDATION_NOT_ALLOW = {
  status: 500,
  title: 'Não foi possivel enviar essa ação',
  message: 'Não foi possivel enviar essa ação',
};

const types = {
  NOT_FOUND,
  UNKNOWN,
  ACTION_VALIDATION_NOT_ALLOW,
  USER_CREDENTIALS_INVALID,
  TOKEN_INVALID,
  TOKEN_EXPIRED,
  DATA_NOT_FOUND,
  VOTE_UNIQUE,
  PERMISSION_DENIED,

  AUTH_FAIL,
  AUTH_NOT_BEARER,
  AUTH_REQUIRED_FIELDS,
  AUTH_USER_NOT_EXIST,

  HEADER_CONTENT_TYPE_NOT_ACCEPT,
};

module.exports = types;

module.exports.getTypeByStatus = (status = 500) => {
  const list = Object.keys(types);

  const selected = list.find((typeKey) => types[typeKey].status === status);

  return types[selected] || types.UNKNOWN;
};
