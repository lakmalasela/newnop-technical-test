import { Column, Entity, PrimaryGeneratedColumn,OneToMany } from "typeorm";
import { ROLE } from "../enum/role.enum";
import { IssueEntity } from "src/issues/entity/Issue.entity";

@Entity('user')
export class UserEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique:true})
    email: string;

    @Column()
    password:string;

    @Column({type:'enum',enum:ROLE,default:ROLE.GUEST})
    role:ROLE;

    @OneToMany(() => IssueEntity, (issue) => issue.user)
    issues?: IssueEntity[];
}