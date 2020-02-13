import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  Column,
  CreateDateColumn
} from "typeorm";

@Entity("courses")
export class Course extends BaseEntity {
  @PrimaryColumn({ type: "int", unique: true })
  nrc: number;

  @Column({ type: "varchar" })
  materia: string;

  @Column({ type: "varchar" })
  profesor: string;

  @Column({ type: "varchar" })
  horario: string;

  @CreateDateColumn({ type: "timestamp", name: "created_at" })
  createdAp: Date;

  @CreateDateColumn({ type: "timestamp", name: "updated_at" })
  updatedAt: Date;
}
