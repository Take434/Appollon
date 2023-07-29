#!/bin/bash

mkdir output
touch output/merged.md
touch output/toc.md

echo "# Appollon
![](images/AppollonLogo.svg)  
_Appollon Logo, created by Tim_
## Table of Contents" >> output/toc.md

cat _Sidebar.md | while read l; do
	if [[ ${l:0:3} != "###" ]]; then
		continue
	fi

	n=${l#*[}
	n=${n%]*}
	l=${l#*(}
	l=${l%)*}

	echo "now converting $l"

	p="./${l//%20/\\ }.md"

	echo "changed to $p"

	if test -f $p; then
		echo "- [$l](#$l)" >> output/toc.md

		if [[ $(head $p -n1) != "# ${l//%20/ }" ]]; then
			cat <(echo "# ${l//%20/ }") $p > new_${l//%20/\\ }.md
			mv new_${l//%20/\\ }.md $p
		fi

		echo >> output/merged.md

		if [[ $l == "Home" ]]; then
			echo "# Home" >> output/merged.md
			tail -n +6 $p >> output/merged.md
		else
			cat $p >> output/merged.md
		fi
	fi
done

cat <(cat output/toc.md) output/merged.md > output/new_merged.md
mv output/new_merged.md output/merged.md
rm output/toc.md
