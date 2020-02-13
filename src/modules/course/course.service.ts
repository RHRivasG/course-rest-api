import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CourseRepository } from "./course.repository";
import { Course } from "./course.entity";
import { CourseDto } from "./dto/course.dto";

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseRepository)
    private readonly _courseRepository: CourseRepository
  ) {}

  //Get all courses
  async getAll(): Promise<Course[]> {
    const courses: Course[] = await this._courseRepository.find();
    return courses;
  }

  //Get a single course
  async get(nrc: number): Promise<Course> {
    if (!nrc) {
      throw new BadRequestException("nrc must be sent");
    }
    const course: Course = await this._courseRepository.findOne(nrc);
    if (!course) {
      throw new NotFoundException();
    }
    return course;
  }

  //Post a single course
  async create(courseDto: CourseDto): Promise<Course> {
    const { nrc } = courseDto;
    const courseExists = await this._courseRepository.findOne({
      where: [{ nrc }]
    });
    if (courseExists) {
      throw new ConflictException("nrc alredy exists");
    }
    const course: Course = await this._courseRepository.converter(courseDto);
    return await this._courseRepository.save(course);
  }

  //Patch a single course
  async update(nrc: number, courseDto: CourseDto): Promise<Course> {
    const nrcExists = await this._courseRepository.findOne({
      where: [{ nrc }]
    });
    if (!nrcExists) {
      throw new NotFoundException();
    }

    const course: Course = await this._courseRepository.converter(courseDto);
    if (course.nrc != nrc) {
      const courseExists = await this._courseRepository.findOne({
        where: [[course.nrc]]
      });
      if (courseExists) {
        throw new ConflictException("nrc alredy exists");
      }
    }

    await this._courseRepository.update(nrc, course);
    return course;
  }

  //Delete a single course
  async delete(nrc: number): Promise<void> {
    const courseExists = await this._courseRepository.findOne(nrc);
    if (!courseExists) {
      throw new NotFoundException();
    }
    await this._courseRepository.delete(nrc);
  }
}
