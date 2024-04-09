import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
//Dat je klasse User hebt en je wilt enkel de email en het wachtwoord versturen om in te loggen, 
//kun je een specifieke DTO maken voor dit doel. Dit DTO zal alleen de velden bevatten die nodig
// zijn voor het inlogproces, in dit geval de email en het wachtwoord.

// structuur van gegevens die worden uitgewisseld tussen de frontend en de backend