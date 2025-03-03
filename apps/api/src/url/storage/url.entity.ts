import { Entity, Column, CreateDateColumn, PrimaryColumn } from 'typeorm';

@Entity('url')
export class UrlEntity {
  @PrimaryColumn('varchar')
  slug: string;

  @Column()
  originalUrl: string;

  @CreateDateColumn()
  createdAt: Date;
}
