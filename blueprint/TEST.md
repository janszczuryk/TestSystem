# Blueprint

Written down ideas for `TestSystem` project

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
    * Test access: Unavailable, Available (learner can join with *Learner number*)
    * Test state: Created, Started (learner can answer a question), Finished

2. Operation flow
    * Registration for teachers via email/password or OAuth
    * Each teacher account is verified on database side
    * Public registration for learners via email/password or OAuth
    * Login (logout) ability for teachers
    * Login (logout) ability for learners
    * Test creation tool for teachers (importable questions, fixed questions list/random given amount of questions)
    * Test management tool for teachers (list, edit, remove, export questions, export results)
    * Test launcher tool for teachers (start, stop, available, unavailable, timer)
    * Available test list for learners
    * Test results history for learners
    * Test viewer tool for learners (join with *Learner number*, fetch questions one by one, answer questions to the
      end,
      see the results)

## Tasks

1. Epics
    - To be done

## Backend

1. Endpoints
    - To be done