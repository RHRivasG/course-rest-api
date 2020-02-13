import { EntityRepository, Repository } from "typeorm";
import { Course } from "./course.entity";
import { CourseDto } from "./dto/course.dto";

@EntityRepository(Course)
export class CourseRepository extends Repository<Course> {
  async converter(courseDto: CourseDto): Promise<Course> {
    const { nrc, materia, profesor, horario } = courseDto;
    const course = new Course();
    course.nrc = nrc;
    course.materia = materia;
    course.profesor = profesor;
    course.horario = horario;
    return course;
  }
}
