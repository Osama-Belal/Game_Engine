% Predicate to solve the N-queens problem
n_queens(N, Solution) :-
    length(Solution, N),
    queens(Solution, N),
    safe_queens(Solution).

n_queens(N, Partial, Solution) :-
    length(Solution, N),
    queens(Solution, N),
    sublist(Partial, Solution),
    safe_queens(Solution).

% Sublist for partial solution
sublist(A, B) :-
    append(Before, After, B),
    append(Useless, A, Before).

% Predicate to place the queens on the board
queens([], _).
queens([Col|Cols], N) :-
    queens(Cols, N),
    between(1, N, Col).

% Predicate to check if a queen is safe from attacks
safe_queens([]).
safe_queens([Col|Cols]) :-
    safe_queen(Col, Cols, 1),
    safe_queens(Cols).

% Predicate to check if a queen is safe from attacks
safe_queen(_, [], _).
safe_queen(Col, [Col2|Cols], Offset) :-
    Col =\= Col2,
    Offset2 is Offset + 1,
    abs(Col - Col2) =\= Offset,
    safe_queen(Col, Cols, Offset2).
