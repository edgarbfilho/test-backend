import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const token = request.headers['authorization']

    if (!token) {
      throw new UnauthorizedException('Token não informado')
    }

    // Aqui você pode validar JWT futuramente
    return true
  }
}
