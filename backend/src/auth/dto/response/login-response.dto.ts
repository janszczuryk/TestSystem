export class LoginResponseDto {
  public readonly jwtToken: string;

  public constructor(props: { jwtToken: string }) {
    this.jwtToken = props.jwtToken;
  }
}
