:- use_module(library(clpfd)).

% Predicate to solve the N-queens problem
n_queens(N, Solution) :-
    length(Solution, N),
    all_queens(Solution, N),
    safe_queens(Solution).

n_queens(N, Partial, Solution) :-
    length(Solution, N),
    all_queens(Solution, N),
    sublist(Partial, Solution),
    safe_queens(Solution).


% Sublist for partial solution
sublist(A, B) :-
    append(Before, After, B),
    append(Useless, A, Before).


% Predicate to place the queens on the board
all_queens(Solution, N):-
  sublist([1], Solution),
  sublist([2], Solution),
  sublist([3], Solution),
  sublist([4], Solution),
  sublist([5], Solution),
  sublist([6], Solution),
  sublist([7], Solution),
  sublist([8], Solution).


% Predicate to check if a queen is safe from attacks
safe_queens([]).
safe_queens([Col|Cols]) :-
  safe_queens(Cols, Col, 1),
  safe_queens(Cols).

safe_queens([], _, _).
safe_queens([First|Other], Col, Offset) :-
        Col =\= First,
        abs(Col - First) =\= Offset,
        Next = Offset + 1,
        safe_queens(Other, Col, Next).

