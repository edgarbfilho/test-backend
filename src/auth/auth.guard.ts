import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'

// Guard de autenticação simples.
// Neste momento apenas verifica a existência do header Authorization.
@Injectable()
export class AuthGuard implements CanActivate {
  // Método executado antes de permitir acesso à rota protegida.
  canActivate(context: ExecutionContext): boolean {
    // Obtém o objeto de request HTTP a partir do contexto de execução.
    const request = context.switchToHttp().getRequest()
    // Lê o token enviado no header Authorization.
    const token = request.headers['authorization']

    // Se não houver token, bloqueia a requisição com erro 401.
    if (!token) {
      throw new UnauthorizedException('Token não informado')
    }

    // Aqui você pode validar JWT futuramente
    // Se passou na validação mínima, libera o acesso.
    return true
  }
}
