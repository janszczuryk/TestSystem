# Blueprint

Written down ideas for `TestSystem` project.

## Ideas

1. Assumptions
    * Teachers can easily create and import tests from spreadsheet file
    * Teachers can easily export tests results as pdf or spreadsheet file
    * Teachers can manually start and stop test
    * Teachers must manually assign *Learner number* to each learner and store learners association list on their own
    * Learners can easily log in (OAuth) and take any available test
    * Learners can join with *Learner number* and answer questions when given test is started
    * Learners and teacher have access to their tests results
    * Each learner gets the *Learner number* assigned by teacher before test starts and enters it to be able to start
      test attempt
    * Whole application should not persist GDPR vulnerable data
    * Test accessible: True, False (learner can join with *Learner number*)
    * Test status: Created, Started (learner can answer a question), Ended

2. System flow
    * Registration for teachers via email/password or OAuth
    * Each teacher account is verified on database side
    * Public registration for learners via email/password or OAuth
    * Login (logout) ability for teachers
    * Login (logout) ability for learners
    * Test creation tool for teachers (importable questions)
    * Test management tool for teachers (list, edit, remove, export questions)
    * Test instance management tool for teachers (start, stop, available, unavailable, timer, fixed questions
      list/random given amount of questions, export results)
    * Available test list for learners
    * Test results history for teacher
    * Test viewer tool for learners (join with *Learner number*, fetch questions one by one, answer questions to the
      end, see the results)

## Backend

1. Endpoints (REST API)

   | METHOD   | ENDPOINT                                     | SHORT DESCRIPTION                                | AUTHORISATION NEEDED |
   |----------|----------------------------------------------|--------------------------------------------------|----------------------|
   | POST     | /auth/login                                  | Login to an account with given credentials       | NO                   |
   | POST     | /auth/register                               | Register a new account                           | NO                   |
   | ~~POST~~ | ~~/auth/logout~~                             | ~~Logout from an account~~                       | ~~ACCOUNT~~          |
   | POST     | /auth/change-password                        | Change an account password                       | ACCOUNT              |
   | GET      | /accounts/learner/@me                        | Get a learner account for current authentication | LEARNER              |
   | GET      | /accounts/teacher/@me                        | Get a teacher account for current authentication | TEACHER              |
   | GET      | /subjects                                    | Get list of subjects                             | TEACHER              |
   | POST     | /subjects                                    | Create a new subject                             | TEACHER              |
   | GET      | /subjects/:subject_id                        | Get a subject                                    | TEACHER              |
   | PATCH    | /subjects/:subject_id                        | Update a subject                                 | TEACHER              |
   | DELETE   | /subjects/:subject_id                        | Delete a subject                                 | TEACHER              |
   | GET      | /schemas                                     | Get list of test schemas                         | TEACHER              |
   | POST     | /schemas                                     | Create a new test schema                         | TEACHER              |
   | GET      | /schemas/:schema_id                          | Get a test schema                                | TEACHER              |
   | PATCH    | /schemas/:schema_id                          | Update a test schema                             | TEACHER              |
   | DELETE   | /schemas/:schema_id                          | Delete a test schema (cascade)                   | TEACHER              |
   | GET      | /schemas/:schema_id/questions                | Get list of test questions                       | TEACHER              |
   | POST     | /schemas/:schema_id/questions                | Create a new test question                       | TEACHER              |
   | GET      | /schemas/:schema_id/questions/:question_id   | Get a test question                              | TEACHER              |
   | PATCH    | /schemas/:schema_id/questions/:question_id   | Update a test question                           | TEACHER              |
   | DELETE   | /schemas/:schema_id/questions/:question_id   | Delete a test question (cascade)                 | TEACHER              |
   | GET      | /schemas/:schema_id/instances                | Get list of test instances                       | TEACHER              |
   | POST     | /schemas/:schema_id/instances                | Create a new test instance                       | TEACHER              |
   | GET      | /schemas/:schema_id/instances/:instance_id   | Get a test instance                              | TEACHER              |
   | PATCH    | /schemas/:schema_id/instances/:instance_id   | Update a test instance                           | TEACHER              |
   | DELETE   | /schemas/:schema_id/instances/:instance_id   | Delete a test instance (cascade)                 | TEACHER              |
   | GET      | /instances/:instance_id/learners             | Get list of test instance learners               | TEACHER              |
   | POST     | /instances/:instance_id/learners             | Create a new test instance learner               | TEACHER              |
   | GET      | /instances/:instance_id/learners/:learner_id | Get a test instance learner                      | TEACHER              |
   | PATCH    | /instances/:instance_id/learners/:learner_id | Update a test instance learner                   | TEACHER              |
   | DELETE   | /instances/:instance_id/learners/:learner_id | Delete a test instance learner (cascade)         | TEACHER              |
   | GET      | /learner/instances                           | Get list of test instances enabled for learner   | LEARNER              |
   | GET      | /learner/instances/:instance_id              | Get a test instance enabled for learner          | LEARNER              |
   | POST     | /learner/instances/:instance_id/join         | Join to a test instance as learner               | LEARNER              |
   | GET      | /learner/instances/:instance_id/question     | Get a test instance current question             | LEARNER              |
   | POST     | /learner/instances/:instance_id/answer       | Answer to test instance current question         | LEARNER              |

2. Domain
    * Account / TeacherAccount / LearnerAccount
        * Id
        * Email
        * Password
        * Verified
        * AccountType (Teacher, Learner)

    * Subject
        * Id
        * Name
        * FieldOfStudy
        * TestSchema[]

    * TestSchema
        * Id
        * Name
        * Subject
        * TestSchemaQuestion[]
        * TestInstance[]

    * TestSchemaQuestion
        * Id
        * Question
        * Answer[]
        * CorrectAnswerIndex
        * TestSchema
        * TestQuestionInstance[]

    * TestInstance
        * Id
        * TestSchema
        * TestInstanceQuestion[]
        * QuestionsCount
        * IsEnabled
        * Status (Created, Started, Ended)
        * StartedAt
        * EndedAt
        * Teacher
        * TestInstanceLearner[]

    * TestInstanceQuestion
        * Id
        * TestSchemaQuestion
        * TestInstance
        * TestInstanceLearnerAnswer[]
        * Question
        * Answer[]
        * CorrectAnswerIndex

    * TestInstanceLearner
        * Id
        * TestInstance
        * TestInstanceLearnerAnswer[]
        * Learner (Unique with TestInstance)
        * LearnerNumber (Unique with TestInstance)
        * Status (Joined, Started, Finished)
        * StartedAt
        * FinishedAt

   * TestInstanceLeanerAnswer
        * Id
        * TestInstanceLearner
        * TestInstanceQuestion
        * Status (Created, Shown, CorrectAnswerSubmitted, IncorrectAnswerSubmitted)
        * SubmittedAnswerIndex
        * ShownAt
        * AnswerSubmittedAt

3. Database (outdated with current domain)
    * DBML file - [click here](database/schema.dbml)
    * SQL schema - [click here](database/schema.sql) (generated by https://dbdiagram.io)
    * Schema view image - [click here](database/schema.png) (generated by https://dbdiagram.io)

## Frontend

1. To be done.
