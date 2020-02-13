import { IsNotEmpty, IsInt, IsString, Length } from "class-validator";

export class CourseDto {
  @IsNotEmpty()
  @IsInt()
  nrc: number;

  @IsNotEmpty()
  @Length(0, 20)
  materia: string;

  @IsNotEmpty()
  @IsString()
  @Length(0, 20)
  profesor: string;

  @IsNotEmpty()
  @IsString()
  @Length(0, 20)
  horario: string;
}
