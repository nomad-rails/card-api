import { ConfigService } from '@nestjs/config';
import { Header, Payload, SIWS } from '@web3auth/sign-in-with-solana';
import { VerifySIWSPayloadDto } from '@lib/common/dtos/main/verify-siws.dto';

export function getSIWS(
  cfg: ConfigService<Config, false>,
  address: string,
  _p?: VerifySIWSPayloadDto,
) {
  const SIWS_DOMAIN = cfg.getOrThrow('SIWS_DOMAIN');
  const SIWS_ORIGIN = cfg.getOrThrow('SIWS_ORIGIN');
  const SIWS_VERSION = cfg.getOrThrow('SIWS_VERSION');
  const SIWS_CHAIN_ID = parseInt(cfg.getOrThrow('SIWS_CHAIN_ID'), 10);

  if (_p) {
    if (_p.domain !== SIWS_DOMAIN) {
      throw new Error('Invalid SIWS domain');
    }
    if (_p.uri !== SIWS_ORIGIN) {
      throw new Error('Invalid SIWS origin');
    }
    if (_p.version !== SIWS_VERSION) {
      throw new Error('Invalid SIWS version');
    }
    if (_p.chainId !== SIWS_CHAIN_ID) {
      throw new Error('Invalid SIWS chain ID');
    }
  }

  const header = new Header();
  header.t = 'sip99';

  const payload = new Payload();
  payload.domain = _p?.domain || SIWS_DOMAIN;
  payload.address = address;
  payload.statement = _p?.statement;
  payload.uri = _p?.uri || SIWS_ORIGIN;
  payload.version = _p?.version || SIWS_VERSION;
  payload.chainId = _p?.chainId || SIWS_CHAIN_ID;
  payload.nonce = _p?.nonce;
  payload.issuedAt = _p?.issuedAt;
  payload.expirationTime = _p?.expirationTime;
  payload.notBefore = _p?.notBefore;
  payload.requestId = _p?.requestId;
  payload.resources = _p?.resources;

  return new SIWS({
    header,
    payload,
  });
}
