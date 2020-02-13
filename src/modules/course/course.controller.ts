import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Patch,
  Delete
} from "@nestjs/common";
import { CourseService } from "./course.service";
import { Course } from "./course.entity";
import { CourseDto } from "./dto/course.dto";

@Controller("courses")
export class CourseController {
  constructor(private readonly _courseService: CourseService) {}

  @Get()
  async getCourses(): Promise<Course[]> {
    const courses = await this._courseService.getAll();
    return courses;
  }

  @Get(":nrc")
  async getCourse(@Param("nrc", ParseIntPipe) nrc: number): Promise<Course> {
    const course = await this._courseService.get(nrc);
    return course;
  }

  @Post()
  async createCourse(@Body() courseDto: CourseDto): Promise<Course> {
    const createCourse = await this._courseService.create(courseDto);
    return createCourse;
  }

  @Patch(":nrc")
  async updateCourse(
    @Param("nrc", ParseIntPipe) nrc: number,
    @Body() courseDto: CourseDto
  ) {
    const updateCourse = await this._courseService.update(nrc, courseDto);
    return updateCourse;
  }

  @Delete(":nrc")
  async deleteCourse(@Param("nrc", ParseIntPipe) nrc: number) {
    await this._courseService.delete(nrc);
    return true;
  }
}
