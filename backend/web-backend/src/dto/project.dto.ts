import { Rule, RuleType } from '@midwayjs/validate';
import { Task } from './task.dto';

export class Project {
  @Rule(RuleType.string().required())
  projectName: string;
  
  @Rule(RuleType.array().items(RuleType.object().instance(Task)))
  tasklist: Task[] ;

  //   @Rule(RuleType.number().required())
  //   projectIndex: number;

  //   @Rule(RuleType.string().required())
  //   projectOwner: string;

  //   @Rule(RuleType.string().required())
  //   projectType: string;

  //   @Rule(RuleType.string().required())
  //   projectStatus: string;
}
